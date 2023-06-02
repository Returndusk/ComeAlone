import React from 'react';
import styles from './ScheduleDetail.module.scss';

function ScheduleDetailInfoComponent({
  schedule
}: {
  schedule: {
    duration: string;
    title: string;
    createdBy: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    summary: string;
  };
}) {
  const { duration, title, createdBy, createdAt, startDate, endDate, summary } =
    schedule;

  return (
    <div className={styles['schedule-info-wrapper']}>
      <div className={styles.duration}>
        {`${startDate} ~ ${endDate} (${duration}일)`}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.writer}>{createdBy}</div>
      <div className={styles.date}>{createdAt}</div>
      <p>{summary}</p>
    </div>
  );
}

export default ScheduleDetailInfoComponent;
