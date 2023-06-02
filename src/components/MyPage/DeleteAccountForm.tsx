import React, { useState } from 'react';
import styles from './DeleteAccountForm.module.scss';

interface DeleteFormProps {
  cancelDeleteAccount: () => void;
}

function DeleteAccountForm({ cancelDeleteAccount }: DeleteFormProps) {
  const [password, setPassword] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form className={styles.form}>
      <div className={styles.input}>
        <label htmlFor='passwordConfirm'>비밀번호 확인</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={handleChange}
        />
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
