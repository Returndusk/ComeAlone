import React, { useState } from 'react';
import styles from './UserConfirmForm.module.scss';

interface UserConfirmFormProps {
  confirmUser: () => void;
}

function UserConfirmForm({ confirmUser }: UserConfirmFormProps) {
  const [password, setPassword] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const attemptSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirmUser();
  };

  return (
    <form className={styles.form} onSubmit={attemptSubmit}>
      <div className={styles.input}>
        <label htmlFor='password'>비밀번호 확인</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={handleChange}
        />
      </div>
      <button type='submit'>확인</button>
    </form>
  );
}

export default UserConfirmForm;
