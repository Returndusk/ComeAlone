import React from 'react';
import styles from './InfoScheduleDetail.module.scss';
import Avatar from '@mui/material/Avatar';
import { ScheduleDetailInfoType } from '../../types/ScheduleDetailTypes';

function InfoScheduleDetail({
  nickname,
  profileImage,
  title,
  summary,
  duration,
  startDate,
  endDate,
  createdAt,
  updatedAt
}: ScheduleDetailInfoType) {
  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString('ko-KR')
      .replace('.', '년 ')
      .replace('.', '월 ')
      .replace('.', '일 ');
  };

  return (
    <>
      <div className={styles.date}>
        <span>{formatDate(createdAt)} 작성</span>
        <span>{formatDate(updatedAt)} 수정</span>
      </div>
      <div className={styles.duration}>
        <span>여행 기간</span>
        {`${formatDate(startDate)} ~ ${formatDate(endDate)} (총 ${duration}일)`}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.nickname}>
        {profileImage ? (
          <span className={styles.avatar}>
            <Avatar src={profileImage} sx={{ width: 45, height: 45 }} />
          </span>
        ) : (
          <span className={styles.avatar}>
            <Avatar sx={{ width: 45, height: 45 }}>{nickname[0]}</Avatar>
          </span>
        )}
        {nickname}
      </div>
      <div className={styles.summary}>{summary}</div>
    </>
  );
}

export default InfoScheduleDetail;
