import React from 'react';
import styles from './ScheduleCard.module.scss';
import { Link } from 'react-router-dom';
import { ScheduleType } from '../ScheduleList/ScheduleList';

export function ScheduleCard(schedule: ScheduleType, index: number) {
  const endDate = new Date(schedule.end_date);
  const startDate = new Date(schedule.start_date);
  const createdAt = schedule.createdAt;
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDate = Math.floor(diffTime / (24 * 60 * 60 * 1000));

  return (
    <Link to='/schedule/detail' key={index} className={styles.scheduleCard}>
      <div className={styles.scheduleContent}>
        <div className={styles.scheduleText}>
          <div className={styles.scheduleTitle}>{schedule.title}</div>
          <div className={styles.scheduleDescription}>
            {schedule.description}
          </div>
          <div className={styles.scheduleDate}>
            {diffDate}박 {diffDate + 1}일
          </div>
          <div className={styles.scheduleAuthor}>
            작성자 : {schedule.createdBy}
          </div>
          <div className={styles.scheduleCreated}>등록 : {createdAt}</div>
        </div>
        <div className={styles.scheduleLike}>❤ {schedule.likes}</div>
      </div>
      <div className={styles.scheduleDestination}>
        {schedule.destinations.join('=>')}
      </div>
    </Link>
  );
}
