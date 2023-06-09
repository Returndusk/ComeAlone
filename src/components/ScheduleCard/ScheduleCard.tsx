import React, { useState } from 'react';
import styles from './ScheduleCard.module.scss';
import { Link } from 'react-router-dom';
import { ScheduleCardType } from '../../types/ScheduleTypes';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuthState } from '../../contexts/AuthContext';
import ROUTER from '../../constants/Router';

type ScheduleCardProps = { schedule: ScheduleCardType };

function ScheduleCard({ schedule }: ScheduleCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { authState } = useAuthState();
  const isLoggedIn = authState.isLoggedIn;

  function getDate(dateString: string) {
    const toDate = new Date(dateString);
    const year = toDate.getFullYear();
    const month = toDate.getMonth() + 1;
    const day = toDate.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }

  function handleLike(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (isLoggedIn) {
      setIsLiked(!isLiked);
    } else {
      alert('로그인이 필요합니다.');
    }
  }

  return (
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
              {schedule.duration - 1}박 {schedule.duration}일
            </div>
            <div>작성자 : {schedule.user.nickname}</div>
            <div>등록 : {getDate(schedule.created_at)}</div>
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
          <div>
            {schedule.first_destination
              ? schedule.first_destination
              : '출발지가 필요합니다'}
          </div>
          <div>{'=>'}</div>
          <div className={styles.destinationCount}>
            경유{' '}
            {schedule.destination_count - 2 > 0
              ? schedule.destination_count - 2
              : 0}
          </div>
          <div>{'=>'}</div>
          <div>
            {schedule.last_destination
              ? schedule.last_destination
              : '도착지가 필요합니다'}
          </div>
        </div>
        <img
          src={
            schedule.image
              ? schedule.image
              : 'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
          }
          className={styles.image}
          alt='일정 배경 사진'
        />
      </div>
    </Link>
  );
}

export default ScheduleCard;
