import React from 'react';
import styles from './ScheduleCard.module.scss';
import { Link } from 'react-router-dom';
import { MyScheduleCardProps } from '../../types/ScheduleTypes';
import { FaTrashAlt } from 'react-icons/fa';
import { useAuthState } from '../../contexts/AuthContext';
import ROUTER from '../../constants/Router';

function ScheduleCard({ schedule }: MyScheduleCardProps) {
  console.log(schedule);
  const { authState } = useAuthState();
  const isLoggedIn = authState.isLoggedIn;

  function handleDelete(e: React.MouseEvent<SVGElement>) {
    e.preventDefault();
    if (isLoggedIn) {
      if (confirm('일정을 삭제하시겠습니까?')) {
        alert('일정이 삭제되었습니다.');
      }
    } else {
      confirm('로그인이 필요합니다. 로그인 하시겠습니까?');
    }
  }

  function getDate(dateString: string) {
    const toDate = new Date(dateString);
    const year = toDate.getFullYear();
    const month = toDate.getMonth() + 1;
    const day = toDate.getDate();
    return `${year}년 ${month}월 ${day}일`;
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
            <div>
              {getDate(schedule.start_date)} ~ {getDate(schedule.end_date)}
            </div>
            <div>등록 : {getDate(schedule.created_at)}</div>
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
