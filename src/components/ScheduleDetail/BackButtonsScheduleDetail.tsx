import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BackButtonsScheduleDetail.module.scss';
import { useAuthState } from '../../contexts/AuthContext';
import ROUTER from '../../constants/Router';

function BackButtonsScheduleDetail({ userId }: { userId: string }) {
  const loggedInUserId: string = useAuthState().authState.user?.id as string;

  return (
    <div>
      <button className={styles.toListButton}>
        <Link to={ROUTER.SCHEDULE_LIST}>일정 목록 보기</Link>
      </button>
      {userId === loggedInUserId && (
        <button className={styles.toMyListButton}>
          <Link to={ROUTER.MYSCHEDULE_LIST}>내 일정 목록 보기</Link>
        </button>
      )}
    </div>
  );
}

export default BackButtonsScheduleDetail;
