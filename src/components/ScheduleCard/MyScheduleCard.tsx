import React from 'react';
import styles from './ScheduleCard.module.scss';
import { Link } from 'react-router-dom';
import { MyScheduleCardType } from '../../types/ScheduleTypes';
import { FaRegDotCircle } from 'react-icons/fa';
import ROUTER from '../../constants/Router';

type MyScheduleCardProps = { schedule: MyScheduleCardType };

function ScheduleCard({ schedule }: MyScheduleCardProps) {
  function getDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }

  return (
    <>
      <Link
        to={`${ROUTER.SCHEDULE_DETAIL}/${schedule.schedule_id}`}
        className={styles.scheduleCard}
      >
        <div className={styles.scheduleCardContent}>
          <div className={styles.scheduleContent}>
            <div className={styles.scheduleText}>
              <div className={styles.scheduleTitle}>{schedule.title}</div>
              <div>{schedule.summary}</div>
              <div>
                {schedule.duration > 1
                  ? `${schedule.duration - 1}박 ${schedule.duration}일`
                  : '당일치기'}
              </div>
              <div>{getDate(schedule.start_date)}</div>
              {schedule.start_date != schedule.end_date && (
                <div>{getDate(schedule.end_date)}</div>
              )}
            </div>
          </div>
          <div className={styles.scheduleDestination}>
            <div className={styles.destinationMap}>
              <FaRegDotCircle />
              <div className={styles.mapLineContainer}>
                <div className={styles.mapLine}></div>
              </div>
              <div className={styles.destinationCount}>
                경유{' '}
                {schedule.destination_count - 2 > 0
                  ? schedule.destination_count - 2
                  : 0}
              </div>
              <FaRegDotCircle />
            </div>
            <div className={styles.destinationText}>
              <div>
                {schedule.first_destination
                  ? schedule.first_destination
                  : '출발지 없음'}
              </div>
              <div>
                {schedule.last_destination
                  ? schedule.last_destination
                  : '도착지 없음'}
              </div>
            </div>
          </div>
          <img
            src={schedule.image}
            className={styles.image}
            alt='일정 배경 사진'
          />
        </div>
      </Link>
    </>
  );
}

export default ScheduleCard;
