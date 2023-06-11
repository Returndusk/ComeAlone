import React, { useState } from 'react';
import styles from './ButtonsScheduleEdit.module.scss';
import AlertModal from '../common/Alert/AlertModal';

function ButtonsScheduleEdit({
  onSubmit,
  onDelete
}: {
  onSubmit: () => void;
  onDelete: () => void;
}) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowDeleteAlert(false);
  };

  const handleUpdate = () => {
    onSubmit();
    setShowUpdateAlert(false);
  };

  return (
    <div className={styles.buttonsContainer}>
      <button
        className={styles.deleteButton}
        onClick={() => setShowDeleteAlert(true)}
      >
        삭제하기
      </button>
      <button
        className={styles.confirmButton}
        onClick={() => setShowUpdateAlert(true)}
      >
        수정완료
      </button>
      {showDeleteAlert && (
        <AlertModal
          message='해당 일정을 삭제하시겠습니까?'
          showCancelButton={true}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteAlert(false)}
        />
      )}
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
