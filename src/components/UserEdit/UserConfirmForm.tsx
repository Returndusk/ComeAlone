import React, { useState } from 'react';
import { UserConfirmFormProps } from '../../types/UserTypes';
import styles from './UserConfirmForm.module.scss';

function UserConfirmForm({ confirmUser }: UserConfirmFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validateForm = (password: string) => {
    let errMsg = '';
    if (!password) errMsg = '비밀번호를 입력해주세요.';
    return errMsg;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateForm(password);
    setError(validationError);

    if (!validationError) {
      alert('유효성 검사 통과!');
      //비밀번호 확인 api 호출

      //비밀번호 확인 성공시
      confirmUser();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.input}>
        <label htmlFor='password'>비밀번호 확인</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={handleChange}
        />
        {error && <p className={styles.errMsg}>{error}</p>}
      </div>
      <button type='submit'>확인</button>
    </form>
  );
}

export default UserConfirmForm;
