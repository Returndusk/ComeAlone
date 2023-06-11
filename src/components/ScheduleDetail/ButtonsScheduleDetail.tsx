import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ButtonsScheduleDetail.module.scss';
import ROUTER from '../../constants/Router';

function ButtonsScheduleDetail({
  userId,
  loggedInUserId,
  scheduleId
}: {
  userId: string;
  loggedInUserId: string | undefined;
  scheduleId: string | undefined;
}) {
  return (
    <div className={styles.editButtonContainer}>
      {userId === loggedInUserId ? (
        <Link
          to={`${ROUTER.SCHEDULE_EDIT}/${scheduleId}`}
          className={styles.editButton}
        >
          수정하기
        </Link>
      ) : null}
    </div>
  );
}

export default ButtonsScheduleDetail;
