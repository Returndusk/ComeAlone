import React, { useEffect, useState } from 'react';
import styles from './ScheduleCard.module.scss';
import { Link } from 'react-router-dom';
import { ScheduleCardProps } from '../../types/ScheduleTypes';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function ScheduleCard({ schedule, link }: ScheduleCardProps) {
  const [firstDestination, setFirstDestination] = useState<string>('');
  const [lastDestination, setLastDestination] = useState<string>('');
  const [destinationCount, setDestinationCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

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

  function handleLike(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsLiked(!isLiked);
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
            <div>작성자 : {schedule.nickname}</div>
            <div>등록 : {schedule.created_at}</div>
          </div>
          <div className={styles.like}>
            <div
              className={styles.likeIcon}
              onClick={(e) => {
                handleLike(e);
              }}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
            </div>
            좋아요 수
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
