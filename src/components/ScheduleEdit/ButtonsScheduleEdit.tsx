import React from 'react';
import styles from './ButtonsScheduleEdit.module.scss';

function ButtonsScheduleEdit({
  onSubmit,
  onDelete
}: {
  onSubmit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className={styles.buttonsContainer}>
      <button className={styles.deleteButton} onClick={() => onDelete()}>
        삭제하기
      </button>
      <button className={styles.confirmButton} onClick={() => onSubmit()}>
        수정완료
      </button>
    </div>
  );
}

export default ButtonsScheduleEdit;
