import React from 'react';
import styles from './ScheduleList.module.scss';
import { useAuthState } from '../../contexts/AuthContext';
import images from '../../constants/image';
import { useLocation, useNavigate } from 'react-router-dom';
import Router from '../../constants/Router';
import {
  LIKES_FILTER,
  RECENT_FILTER,
  LIKED_FILTER
} from '../../constants/ScheduleList';

type ScheduleProps = {
  children: React.ReactElement;
};

function ScheduleLists({ children }: ScheduleProps) {
  const { authState } = useAuthState();
  const isLoggedIn = authState.isLoggedIn;
  const path = useLocation().pathname.split('/');
  const scheduleFilter = path[path.length - 1];
  const navigate = useNavigate();

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
          <button
            className={`${styles.sortButton} ${
              scheduleFilter === LIKES_FILTER && styles.selected
            }`}
            onClick={() => {
              navigate(`${Router.SCHEDULE_LIST}/${LIKES_FILTER}`);
            }}
          >
            인기순
          </button>
          <button
            className={`${styles.sortButton} ${
              scheduleFilter === RECENT_FILTER && styles.selected
            }`}
            onClick={() => {
              navigate(`${Router.SCHEDULE_LIST}/${RECENT_FILTER}`);
            }}
          >
            최신순
          </button>
          {isLoggedIn && (
            <button
              className={`${styles.sortButton} ${
                scheduleFilter === LIKED_FILTER && styles.selected
              }`}
              onClick={() => {
                navigate(`${Router.SCHEDULE_LIST}/${LIKED_FILTER}`);
              }}
            >
              좋아요 한 일정
            </button>
          )}
        </div>
        {children}
      </div>
    </>
  );
}

export default ScheduleLists;
