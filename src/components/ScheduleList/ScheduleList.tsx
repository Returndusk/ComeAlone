import React from 'react';
import styles from './ScheduleList.module.scss';
import { useAuthState } from '../../contexts/AuthContext';
import images from '../../constants/image';
import { Link, useLocation } from 'react-router-dom';
import Router from '../../constants/Router';

type ScheduleProps = {
  children: React.ReactElement;
};

function ScheduleLists({ children }: ScheduleProps) {
  const { authState } = useAuthState();
  const isLoggedIn = authState.isLoggedIn;
  const path = useLocation().pathname.split('/');
  const scheduleFilter = path[path.length - 1];

  console.log(scheduleFilter);

  return (
    <>
      <div className={styles.imageContainer}>
        <img
          src={images[3]}
          alt='일정 메인 이미지'
          className={styles.scheduleListImage}
        />
        <div className={styles.scheduleListTitle}>
          <h1>여행 일정</h1>
          <h2>마음에 드는 일정을 찾아보세요</h2>
        </div>
      </div>
      <div className={styles.scheduleContainer}>
        <div className={styles.scheduleFilter}>
          <Link
            to={`${Router.SCHEDULE_LIST}/likes`}
            className={`${styles.sortButton} ${
              scheduleFilter === 'likes' && styles.selected
            }`}
          >
            인기순
          </Link>
          <Link
            to={`${Router.SCHEDULE_LIST}/recent`}
            className={`${styles.sortButton} ${
              scheduleFilter === 'recent' && styles.selected
            }`}
          >
            최신순
          </Link>
          {isLoggedIn && (
            <Link
              to={`${Router.SCHEDULE_LIST}/liked`}
              className={`${styles.sortButton} ${
                scheduleFilter === 'liked' && styles.selected
              }`}
            >
              좋아요 한 일정
            </Link>
          )}
        </div>
      </div>
      {children}
    </>
  );
}

export default ScheduleLists;
