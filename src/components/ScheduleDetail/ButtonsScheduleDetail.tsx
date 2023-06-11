import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ButtonsScheduleDetail.module.scss';
import ROUTER from '../../constants/Router';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

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
    <div className={styles.buttonContainer}>
      {userId === loggedInUserId ? (
        <>
          <button id={styles.editButton}>
            <Link to={`${ROUTER.SCHEDULE_EDIT}/${scheduleId}`}>
              <FaPen className={styles.icon} />
              수정
            </Link>
          </button>
          <button id={styles.deleteButton}>
            <FaTrashAlt className={styles.icon} />
            삭제
          </button>
        </>
      ) : null}
    </div>
  );
}

export default ButtonsScheduleDetail;
