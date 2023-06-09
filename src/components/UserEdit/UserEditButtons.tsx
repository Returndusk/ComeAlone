import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserEditButtons.module.scss';

function UserEditButtons() {
  const navigate = useNavigate();
  const handleCancel = () => {
    if (window.confirm('회원 정보 수정을 취소하시겠습니까?')) {
      navigate(-1);
    }
  };
  return (
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
  );
}

export default UserEditButtons;
