import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { TextField } from '@mui/material';
import styles from './UserConfirmForm.module.scss';
import { checkPassword } from '../../apis/UserAPI';
import { useAuthState } from '../../contexts/AuthContext';

type UserConfirmFormProps = {
  confirmUser: () => void;
};

function UserConfirmForm({ confirmUser }: UserConfirmFormProps) {
  const { updateAuthState } = useAuthState();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError('');
    setPassword(e.target.value);
  };

  const validateForm = (password: string) => {
    let errMsg = '';
    if (!password) errMsg = '빈칸을 입력해주세요.';
    return errMsg;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateForm(password);
    setError(validationError);

    if (!validationError) {
      try {
        const data = { password };
        const response = await checkPassword(data);

        if (response.status === 201) {
          confirmUser();
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            if (
              err.response.data.reason === 'INVALID' ||
              err.response.data.reason === 'EXPIRED'
            ) {
              alert('로그인 상태가 아닙니다. 다시 로그인해주세요.');
              return updateAuthState(false);
            }

            return setError('비밀번호가 일치하지 않습니다.');
          }
        }

        console.log(err);
        alert('비밀번호 확인에 실패하였습니다.');
      }
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
