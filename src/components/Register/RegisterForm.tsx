import React, { useState } from 'react';
import styles from './RegisterForm.module.scss';

interface RegisterFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  birthDate: string;
  gender: 'male' | 'female';
  phoneNumber: string;
}

function RegisterForm() {
  const initValues: RegisterFormValues = {
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    birthDate: '',
    gender: 'male',
    phoneNumber: ''
  };
  const [values, setValues] = useState<RegisterFormValues>(initValues);
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
          <label htmlFor='nickname'>닉네임</label>
          <div className={styles.nickname}>
            <input
              type='text'
              name='nickname'
              id='nickname'
              value={values.nickname}
              onChange={handleChange}
            />
            <button type='button'>중복확인</button>
          </div>
        </li>
        <li>
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            name='password'
            id='password'
            value={values.password}
            onChange={handleChange}
          />
        </li>
        <li>
          <label htmlFor='passwordConfirm'>비밀번호 확인</label>
          <input
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            value={values.passwordConfirm}
            onChange={handleChange}
          />
        </li>
        <li>
          <label htmlFor='gender'>성별</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type='radio'
                name='gender'
                value='male'
                checked={values.gender === 'male'}
                onChange={handleChange}
              />
              남자
            </label>
            <label>
              <input
                type='radio'
                name='gender'
                value='female'
                checked={values.gender === 'female'}
                onChange={handleChange}
              />
              여자
            </label>
          </div>
        </li>
        <li>
          <label htmlFor='birthDate'>생년월일</label>
          <input
            type='text'
            name='birthDate'
            id='birthDate'
            value={values.birthDate}
            onChange={handleChange}
          />
        </li>
        <li>
          <label htmlFor='phoneNumber'>연락처</label>
          <input
            type='text'
            name='phoneNumber'
            id='phoneNumber'
            value={values.phoneNumber}
            onChange={handleChange}
          />
        </li>
      </ul>
      <button type='submit'>가입하기</button>
    </form>
  );
}

export default RegisterForm;
