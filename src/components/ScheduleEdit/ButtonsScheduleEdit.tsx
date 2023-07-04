import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ButtonsScheduleEdit.module.scss';
import AlertModal from '../common/Alert/AlertModal';
import ROUTER from '../../constants/Router';

function ButtonsScheduleEdit({
  scheduleId,
  onSubmit
}: {
  scheduleId: string;
  onSubmit: () => void;
}) {
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);

  const handleUpdate = () => {
    onSubmit();
    setShowUpdateAlert(false);
  };

  return (
    <div className={styles.buttonsContainer}>
      <button className={styles.cancelButton}>
        <Link to={`${ROUTER.SCHEDULE_DETAIL}/${scheduleId}`}>취소하기</Link>
      </button>
      <button
        className={styles.confirmButton}
        onClick={() => setShowUpdateAlert(true)}
      >
        수정완료
      </button>
      {showUpdateAlert && (
        <AlertModal
          message='해당 일정을 입력하신 내용으로 수정하시겠습니까?'
          showCancelButton={true}
          onConfirm={handleUpdate}
          onCancel={() => setShowUpdateAlert(false)}
        />
      )}
    </div>
  );
}

export default ButtonsScheduleEdit;
