import React from 'react';
import styles from './InfoScheduleDetail.module.scss';
import Avatar from '@mui/material/Avatar';
import { ScheduleDetailInfoType } from '../../types/ScheduleDetail';

function InfoScheduleDetail({
  nickname,
  title,
  summary,
  duration,
  startDate,
  endDate,
  createdAt
}: ScheduleDetailInfoType) {
  return (
    <div className={styles.scheduleInfoContainer}>
      <div className={styles.duration}>
        {`${startDate.toLocaleDateString(
          'ko-KR'
        )} ~ ${endDate.toLocaleDateString('ko-KR')} (${duration}일)`}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.nickname}>
        <span className={styles.avatar}>
          <Avatar>{nickname[0]}</Avatar>
        </span>
        {nickname}
      </div>
      <div className={styles.date}>{createdAt}</div>
      <p>{summary}</p>
    </div>
  );
}

export default InfoScheduleDetail;
