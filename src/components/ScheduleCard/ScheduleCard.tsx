import React from 'react';
import styles from './ScheduleCard.module.scss';
import { ScheduleType } from '../ScheduleList/ScheduleList';
import { Link } from 'react-router-dom';

type PropsType = {
  schedule: ScheduleType;
  link: string;
};

function ScheduleCard({ schedule, link }: PropsType) {
  const endDate = new Date(schedule.end_date);
  const startDate = new Date(schedule.start_date);
  const createdAt = schedule.createdAt;
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDate = Math.floor(diffTime / (24 * 60 * 60 * 1000));

  return (
    <Link to={link} className={styles.scheduleCard}>
      <div className={styles.scheduleCardContent}>
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
        <img src={schedule.image} className={styles.image} />
      </div>
    </Link>
  );
}

export default ScheduleCard;
