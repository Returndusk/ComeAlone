import React from 'react';
import styles from './InfoScheduleDetail.module.scss';
import Avatar from '@mui/material/Avatar';
import { InfoScheduleDetailType } from '../../types/ScheduleDetail';

function InfoScheduleDetail({
  schedule
}: {
  schedule: InfoScheduleDetailType;
}) {
  const { duration, title, createdBy, createdAt, startDate, endDate, summary } =
    schedule;

  return (
    <div className={styles.scheduleInfoContainer}>
      <div className={styles.duration}>
        {`${startDate.toLocaleDateString(
          'ko-KR'
        )} ~ ${endDate.toLocaleDateString('ko-KR')} (${duration}일)`}
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
