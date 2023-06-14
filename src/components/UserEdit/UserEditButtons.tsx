import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserEditButtons.module.scss';
import AlertModal from '../common/Alert/AlertModal';

type ConfirmOption = {
  isOpen: boolean;
  message: string;
  onConfirm: null | (() => void);
  onCancel: null | (() => void);
};

function UserEditButtons() {
  const navigate = useNavigate();
  const initConfirm = {
    isOpen: false,
    message: '',
    onConfirm: null,
    onCancel: null
  };
  const [confirmModal, setConfirmModal] = useState<ConfirmOption>(initConfirm);

  const handleCancel = () => {
    setConfirmModal({
      isOpen: true,
      message: '회원 정보 수정을 취소하시겠습니까?',
      onConfirm: () => navigate(-1),
      onCancel: () => setConfirmModal(initConfirm)
    });
  };

  return (
    <>
      <ul className={styles.buttons}>
        <li>
          <button type='submit'>수정하기</button>
        </li>
        <li>
          <button
            className={styles.cancelBtn}
            type='button'
            onClick={handleCancel}
          >
            취소
          </button>
        </li>
      </ul>
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

export default UserEditButtons;
