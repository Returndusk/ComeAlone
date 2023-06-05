import React, { useState } from 'react';
import styles from './DeleteAccountForm.module.scss';
import { DeleteFormProps } from '../../types/UserTypes';

function DeleteAccountForm({ cancelDeleteAccount }: DeleteFormProps) {
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
      //비밀번호 확인 성공시 회원탈퇴 api 호출
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.input}>
        <label htmlFor='passwordConfirm'>비밀번호 확인</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={handleChange}
        />
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
