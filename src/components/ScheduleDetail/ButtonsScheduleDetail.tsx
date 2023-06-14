import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ButtonsScheduleDetail.module.scss';
import { deleteScheduleById } from '../../apis/ScheduleEditAPI';
import ROUTER from '../../constants/Router';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import AlertModal from '../common/Alert/AlertModal';

function ButtonsScheduleDetail({
  userId,
  loggedInUserId,
  scheduleId
}: {
  userId: string;
  loggedInUserId: string;
  scheduleId: string;
}) {
  const navigate = useNavigate();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleScheduleDelete = async () => {
    await deleteScheduleById(scheduleId);

    navigate(ROUTER.MYSCHEDULE_LIST);
  };

  return (
    <div className={styles.buttonContainer}>
      {userId === loggedInUserId ? (
        <>
          <button id={styles.editButton}>
            <Link to={`${ROUTER.SCHEDULE_EDIT}/${scheduleId}`}>
              <FaPen className={styles.icon} />
            </Link>
          </button>
          <button
            id={styles.deleteButton}
            onClick={() => setShowDeleteAlert(true)}
          >
            <FaTrashAlt className={styles.icon} />
          </button>
        </>
      ) : null}
      {showDeleteAlert && (
        <AlertModal
          message='해당 일정을 삭제하시겠습니까?'
          showCancelButton={true}
          onConfirm={handleScheduleDelete}
          onCancel={() => setShowDeleteAlert(false)}
        />
      )}
    </div>
  );
}

export default ButtonsScheduleDetail;
