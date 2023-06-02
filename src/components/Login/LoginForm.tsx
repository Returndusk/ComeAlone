import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';

interface LoginFormValues {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const initValues: LoginFormValues = {
    email: '',
    password: ''
  };
  const [values, setValues] = useState<LoginFormValues>(initValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className={styles.form}>
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
