import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Cookies } from 'react-cookie';
import {
  Errors,
  LoginFormData,
  LoginFormValues,
  UserData
} from '../../types/UserTypes';
import { TextField } from '@mui/material';
import styles from './LoginForm.module.scss';
import { loginUser } from '../../apis/UserAPI';
import { useAuthState } from '../../contexts/AuthContext';
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS
} from '../../constants/Token';

function LoginForm() {
  const cookies = new Cookies();
  const { updateAuthState } = useAuthState();

  const navigate = useNavigate();
  const initValues: LoginFormValues = {
    email: '',
    password: ''
  };
  const [values, setValues] = useState<LoginFormValues>(initValues);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const checkEmptyInputFields = (values: LoginFormValues, errMsgs: Errors) => {
    for (const [key, value] of Object.entries(values)) {
      if (!value) errMsgs[key] = '빈칸을 입력해 주세요.';
    }
  };

  const validateEmail = (email: string, errMsgs: Errors) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) {
      errMsgs.email = '유효한 이메일 주소가 아닙니다.';
    }
  };

  const validateForm = (values: LoginFormValues) => {
    const errMsgs: Errors = {};

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

    //전역으로 상태 관리
    alert('로그인에 성공하였습니다!');
    updateAuthState(true, userData);
  };

  const handleLogin = async () => {
    try {
      const data: LoginFormData = {
        id: values.email,
        password: values.password
      };

      const response = await loginUser(data);
      // console.log(response);

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

      console.log(err);
      alert('로그인에 실패하였습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await handleLogin();
    }
  };

  return (
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
  );
}

export default LoginForm;
