import React, { useState } from 'react';
import styles from './DeleteAccountForm.module.scss';
import { DeleteFormProps } from '../../types/UserTypes';
import { TextField } from '@mui/material';

function DeleteAccountForm({ cancelDeleteAccount }: DeleteFormProps) {
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
      //비밀번호 확인 성공시 회원탈퇴 api 호출
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
      <ul className={styles.buttons}>
        <li>
          <button type='submit'>탈퇴하기</button>
        </li>
        <li>
          <button className={styles.cancelBtn} onClick={cancelDeleteAccount}>
            취소
          </button>
        </li>
      </ul>
    </form>
  );
}

export default DeleteAccountForm;
