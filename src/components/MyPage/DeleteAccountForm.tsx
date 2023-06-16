import React, { useState } from 'react';
import styles from './DeleteAccountForm.module.scss';
import { TextField } from '@mui/material';
import { AxiosError } from 'axios';
import { checkPassword, deleteUser } from '../../apis/UserAPI';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';

type AlertOption = {
  isOpen: boolean;
  message: string;
  onConfirm: null | (() => void);
};

type ConfirmOption = {
  isOpen: boolean;
  message: string;
  onConfirm: null | (() => void);
  onCancel: null | (() => void);
};

type DeleteFormProps = {
  cancelDeleteAccount: () => void;
};

function DeleteAccountForm({ cancelDeleteAccount }: DeleteFormProps) {
  const { updateAuthState } = useAuthState();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const initAlert = {
    isOpen: false,
    message: '',
    onConfirm: null
  };
  const [alertModal, setAlertModal] = useState<AlertOption>(initAlert);
  const initConfirm = {
    isOpen: false,
    message: '',
    onConfirm: null,
    onCancel: null
  };
  const [confirmModal, setConfirmModal] = useState<ConfirmOption>(initConfirm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validateForm = (password: string) => {
    let errMsg = '';
    if (!password) errMsg = '빈칸을 입력해주세요.';
    return errMsg;
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUser();
      if (response.status === 200) {
        setAlertModal({
          isOpen: true,
          message: '탈퇴 완료되었습니다.',
          onConfirm: () => {
            updateAuthState(false);
            // navigate('/');
          }
        });
      }
    } catch (err) {
      setAlertModal({
        isOpen: true,
        message: '회원 탈퇴에 실패하였습니다.',
        onConfirm: () => setAlertModal(initAlert)
      });
    }
  };

  const confirmDeleteAccount = async () => {
    setConfirmModal({
      isOpen: true,
      message: '정말 탈퇴하시겠습니까?',
      onConfirm: () => {
        setConfirmModal(initConfirm);
        handleDeleteAccount();
      },
      onCancel: () => setConfirmModal(initConfirm)
    });
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
          confirmDeleteAccount();
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            if (
              err.response.data.reason === 'INVALID' ||
              err.response.data.reason === 'EXPIRED'
            ) {
              return setAlertModal({
                isOpen: true,
                message: '로그인 상태가 아닙니다. 다시 로그인해주세요.',
                onConfirm: () => updateAuthState(false)
              });
            }
            return setError('비밀번호가 일치하지 않습니다.');
          }
        }

        setAlertModal({
          isOpen: true,
          message: '비밀번호 확인에 실패하였습니다.',
          onConfirm: () => setAlertModal(initAlert)
        });
      }
    }
  };

  return (
    <>
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
            sx={{
              '& label.Mui-focused': { color: '#ef6d00' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#fe9036',
                  borderWidth: '1px'
                }
              }
            }}
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
      {alertModal.isOpen && alertModal.onConfirm && (
        <AlertModal
          message={alertModal.message}
          onConfirm={alertModal.onConfirm}
        />
      )}
      {confirmModal.isOpen &&
        confirmModal.onConfirm &&
        confirmModal.onCancel && (
          <AlertModal
            message={confirmModal.message}
            onConfirm={confirmModal.onConfirm}
            onCancel={confirmModal.onCancel}
            showCancelButton={true}
          />
        )}
    </>
  );
}

export default DeleteAccountForm;
