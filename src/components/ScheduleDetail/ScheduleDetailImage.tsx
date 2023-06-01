import React from 'react';
import styles from './ScheduleDetail.module.scss';

function ScheduleDetailImageComponent() {
  return (
    <img
      className={styles.image}
      src='https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80'
      alt='representative-image'
    />
  );
}

export default ScheduleDetailImageComponent;
