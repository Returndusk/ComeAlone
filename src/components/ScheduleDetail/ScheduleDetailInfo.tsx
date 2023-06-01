import React from 'react';
import styles from './ScheduleDetail.module.scss';

function ScheduleDetailInfoComponent() {
  return (
    <>
      <div className={styles.duration}>2023.06.01. ~ 2023.06.03. (3일)</div>
      <div className={styles.title}>혼자 떠나는 우도 여행</div>
      <div className={styles.writer}>제주123</div>
      <div className={styles.date}>2023.04.01.</div>
      <p>혼자 떠나는 우도 여행 일정입니다.</p>
    </>
  );
}

export default ScheduleDetailInfoComponent;
