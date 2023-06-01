import React from 'react';
import styles from './ScheduleDetail.module.scss';

function ScheduleDetailInfoComponent({
  duration,
  title,
  writer,
  startDate,
  endDate,
  date,
  description
}: {
  duration: string;
  title: string;
  writer: string;
  startDate: string;
  endDate: string;
  date: string;
  description: string;
}) {
  return (
    <>
      <div className={styles.duration}>
        {`${startDate} ~ ${endDate} (${duration}일)`}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.writer}>{writer}</div>
      <div className={styles.date}>{date}</div>
      <p>{description}</p>
    </>
  );
}

export default ScheduleDetailInfoComponent;
