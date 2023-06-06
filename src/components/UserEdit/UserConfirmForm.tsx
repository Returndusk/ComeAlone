import React, { useState } from 'react';
import { UserConfirmFormProps } from '../../types/UserTypes';
import styles from './UserConfirmForm.module.scss';
import { TextField } from '@mui/material';

function UserConfirmForm({ confirmUser }: UserConfirmFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validateForm = (password: string) => {
    let errMsg = '';
    if (!password) errMsg = '빈칸을 입력해주세요.';
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
        <TextField
          id='outlined-basic'
          label='비밀번호 확인'
          type='password'
          variant='outlined'
          name='password'
          value={password}
          onChange={handleChange}
          size='small'
          style={{ width: '100%' }}
        />
        {!error && (
          <p className={styles.msg}>
            본인 확인을 위해 비밀번호를 입력해주세요.
          </p>
        )}
        {error && <p className={styles.errMsg}>{error}</p>}
      </div>
      <button type='submit'>확인</button>
    </form>
  );
}

export default UserConfirmForm;
