import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Cookies } from 'react-cookie';
import { LoginFormData, UserData } from '../../types/UserTypes';
import { TextField } from '@mui/material';
import styles from './LoginForm.module.scss';
import { loginUser } from '../../apis/UserAPI';
import { useAuthState } from '../../contexts/AuthContext';
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS
} from '../../constants/Token';
import AlertModal from '../common/Alert/AlertModal';

type AlertOption = {
  isOpen: boolean;
  message: string;
  onConfirm: null | (() => void);
};

interface LoginForm {
  email: string;
  password: string;
}

type LoginFormValues = LoginForm;
type LoginFormErrors = LoginForm;

function LoginForm() {
  const cookies = new Cookies();
  const { updateAuthState } = useAuthState();
  const initAlert = {
    isOpen: false,
    message: '',
    onConfirm: null
  };
  const [alertModal, setAlertModal] = useState<AlertOption>(initAlert);

  const navigate = useNavigate();
  const initValues: LoginFormValues = {
    email: '',
    password: ''
  };
  const initErrors = { ...initValues };
  const [values, setValues] = useState<LoginFormValues>(initValues);
  const [errors, setErrors] = useState<LoginFormErrors>(initErrors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const checkEmptyInputFields = (
    values: LoginFormValues,
    errMsgs: LoginFormErrors
  ) => {
    for (const [key, value] of Object.entries(values)) {
      const errorKey = key as keyof LoginFormErrors;
      if (!value) errMsgs[errorKey] = '빈칸을 입력해 주세요.';
    }
  };

  const validateEmail = (email: string, errMsgs: LoginFormErrors) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) {
      errMsgs.email = '유효한 이메일 주소가 아닙니다.';
    }
  };

  const validateForm = (values: LoginFormValues) => {
    const errMsgs: LoginFormErrors = initErrors;

    checkEmptyInputFields(values, errMsgs);
    if (!errMsgs.email) validateEmail(values.email, errMsgs);

    return errMsgs;
  };

  const handleSuccess = (
    accessToken: string,
    refreshToken: string,
    userData: UserData
  ) => {
    //쿠키에 토큰 저장
    cookies.set('accessToken', accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
    cookies.set('refreshToken', refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

    setAlertModal({
      isOpen: true,
      message: `환영합니다, ${userData.nickname}님!`,
      onConfirm: () => updateAuthState(true, userData)
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => !error)) {
      try {
        const data: LoginFormData = {
          id: values.email,
          password: values.password
        };
        const response = await loginUser(data);

        if (response.status === 201) {
          const { accessToken, refreshToken, user } = response.data;
          handleSuccess(accessToken, refreshToken, user);
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            const errMsg = err.response.data.message;
            return setErrors((prev) => ({ ...prev, password: errMsg }));
          }
        }

        setAlertModal({
          isOpen: true,
          message: '로그인에 실패하였습니다. 잠시 후에 다시 시도해주세요.',
          onConfirm: () => setAlertModal(initAlert)
        });
      }
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <ul className={styles.inputs}>
          <li>
            <TextField
              id='outlined-basic'
              label='이메일'
              variant='outlined'
              name='email'
              value={values.email}
              onChange={handleChange}
              size='small'
              style={{ width: '100%' }}
              sx={{
                '& label.Mui-focused': { color: '#ef6d00' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#fe9036',
                    borderWidth: '1px'
                  }
                }
              }}
            />
            {errors.email && <p className={styles.errMsg}>{errors.email}</p>}
          </li>
          <li>
            <TextField
              id='outlined-basic'
              label='비밀번호'
              type='password'
              variant='outlined'
              name='password'
              value={values.password}
              onChange={handleChange}
              size='small'
              style={{ width: '100%' }}
              sx={{
                '& label.Mui-focused': { color: '#ef6d00' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#fe9036',
                    borderWidth: '1px'
                  }
                }
              }}
            />
            {errors.password && (
              <p className={styles.errMsg}>{errors.password}</p>
            )}
          </li>
        </ul>
        <ul className={styles.buttons}>
          <li>
            <button type='submit'>로그인</button>
          </li>
          <li>
            <button
              className={styles.registerBtn}
              onClick={() => navigate('/register')}
            >
              회원가입
            </button>
          </li>
        </ul>
      </form>
      {alertModal.isOpen && alertModal.onConfirm && (
        <AlertModal
          message={alertModal.message}
          onConfirm={alertModal.onConfirm}
        />
      )}
    </>
  );
}

export default LoginForm;
