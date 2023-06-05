import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';
import { Errors, LoginFormValues } from '../../types/UserTypes';
import axios from 'axios';

function LoginForm() {
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

  const handleLogin = async () => {
    const body = {
      id: values.email,
      password: values.password
    };
    const response = await axios.post(
      'http://34.64.169.7:3000/api/auth/signin',
      body
    );
    console.log(response);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length === 0) {
      alert('유효성 검사 통과!');
      //로그인 api 호출
      await handleLogin();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ul className={styles.inputs}>
        <li>
          <label htmlFor='email'>이메일</label>
          <input
            type='text'
            id='email'
            name='email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.errMsg}>{errors.email}</p>}
        </li>
        <li>
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            id='password'
            name='password'
            value={values.password}
            onChange={handleChange}
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
