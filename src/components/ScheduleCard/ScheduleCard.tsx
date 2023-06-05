import React from 'react';
import styles from './ScheduleCard.module.scss';
import { Link } from 'react-router-dom';
import { ScheduleCardProps } from '../../types/ScheduleTypes';

function ScheduleCard({ schedule, link }: ScheduleCardProps) {
  return (
    <Link to={link} className={styles.scheduleCard}>
      <div className={styles.scheduleCardContent}>
        <div className={styles.scheduleContent}>
          <div className={styles.scheduleText}>
            <div className={styles.scheduleTitle}>{schedule.title}</div>
            <div className={styles.scheduleDescription}>{schedule.summary}</div>
            <div className={styles.scheduleDate}>
              {schedule.duration - 1}박 {schedule.duration}일
            </div>
            <div className={styles.scheduleAuthor}>
              작성자 : {schedule.nickname}
            </div>
            <div className={styles.scheduleCreated}>
              등록 : {schedule.createdAt}
            </div>
          </div>
          <div className={styles.scheduleLike}>❤ 좋아요 수</div>
        </div>
        <div className={styles.scheduleDestination}>
          <div>{schedule.destinations[0]}</div>
          <div>{'=>'}</div>
          <div className={styles.destinationCount}>
            경유{' '}
            {schedule.destinations.length - 2 < 0
              ? 0
              : schedule.destinations.length - 2}
          </div>
          <div>{'=>'}</div>
          <div>{schedule.destinations[schedule.destinations.length - 1]}</div>
        </div>
        <img src={schedule.image} className={styles.image} />
      </div>
    </Link>
  );
}

export default ScheduleCard;
