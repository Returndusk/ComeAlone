import React from 'react';
import styles from './BackButtonScheduleEdit.module.scss';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ROUTER from '../../constants/Router';

function BackButtonScheduleEdit({ scheduleId }: { scheduleId: string }) {
  return (
    <button className={styles.backButton}>
      <Link to={`${ROUTER.SCHEDULE_DETAIL}/${scheduleId}`}>
        <FaArrowLeft className={styles.backIcon} />
        돌아가기
      </Link>
    </button>
  );
}

export default BackButtonScheduleEdit;
