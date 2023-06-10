import React from 'react';
import { useNavigate } from 'react-router';
import styles from './MyPageButtons.module.scss';

type MyPageButtonsProps = {
  attemptDeleteAccount: () => void;
};

function MyPageButtons({ attemptDeleteAccount }: MyPageButtonsProps) {
  const navigate = useNavigate();
  return (
    <ul className={styles.buttons}>
      <li>
        <button type='button' onClick={() => navigate('/mypage/edit')}>
          회원 정보 수정
        </button>
      </li>
      <li>
        <button
          className={styles.withdrawalBtn}
          type='button'
          onClick={attemptDeleteAccount}
        >
          회원 탈퇴
        </button>
      </li>
    </ul>
  );
}

export default MyPageButtons;
