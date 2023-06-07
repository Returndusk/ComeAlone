import React, { useEffect, useState } from 'react';
import styles from './ScheduleCard.module.scss';
import { Link } from 'react-router-dom';
import { MyScheduleCardProps } from '../../types/ScheduleTypes';
import { FaTrashAlt } from 'react-icons/fa';

function ScheduleCard({ schedule, link }: MyScheduleCardProps) {
  const [firstDestination, setFirstDestination] = useState<string>('');
  const [lastDestination, setLastDestination] = useState<string>('');
  const [destinationCount, setDestinationCount] = useState<number>(0);

  useEffect(() => {
    const destinations = schedule.destinations;
    const destinationLength = destinations.length;
    const lastDestinationLength = destinations[destinationLength - 1].length;
    const firstDestination = destinations[0][0];
    const lastDestination =
      destinations[destinationLength - 1][lastDestinationLength - 1];
    const destinationCount =
      destinations.reduce((acc, cur) => acc + cur.length, 0) - 2;
    setFirstDestination(firstDestination);
    setLastDestination(lastDestination);
    setDestinationCount(destinationCount < 0 ? 0 : destinationCount);
  }, []);

  function handleDelete(e: React.MouseEvent<SVGElement>) {
    e.preventDefault();
    confirm('일정을 삭제하시겠습니까?');
  }

  return (
    <Link to={link} className={styles.scheduleCard}>
      <div className={styles.scheduleCardContent}>
        <div className={styles.scheduleContent}>
          <div className={styles.scheduleText}>
            <div className={styles.scheduleTitle}>{schedule.title}</div>
            <div>{schedule.summary}</div>
            <div>
              {schedule.duration - 1}박 {schedule.duration}일
            </div>
            <div>{schedule.start_date}</div>
            <div>{schedule.end_date}</div>
            <div>등록 : {schedule.created_at}</div>
          </div>
          <div className={styles.like}>
            <FaTrashAlt
              className={styles.trashIcon}
              onClick={(e) => {
                handleDelete(e);
              }}
            />
          </div>
        </div>
        <div className={styles.scheduleDestination}>
          <div>{firstDestination}</div>
          <div>{'=>'}</div>
          <div className={styles.destinationCount}>경유 {destinationCount}</div>
          <div>{'=>'}</div>
          <div>{lastDestination}</div>
        </div>
        <img src={schedule.image} className={styles.image} />
      </div>
    </Link>
  );
}

export default ScheduleCard;
