import React from 'react';
import styles from './InfoScheduleDetail.module.scss';
import Avatar from '@mui/material/Avatar';

function InfoScheduleDetail({
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
    <div className={styles.scheduleInfoContainer}>
      <div className={styles.duration}>
        {`${startDate} ~ ${endDate} (${duration}일)`}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.writer}>
        <span className={styles.writerAvatar}>
          <Avatar>{createdBy}</Avatar>
        </span>
        {createdBy}
      </div>
      <div className={styles.date}>{createdAt}</div>
      <p>{summary}</p>
    </div>
  );
}

export default InfoScheduleDetail;
