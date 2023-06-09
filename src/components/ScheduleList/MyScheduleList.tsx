import React, { useCallback, useEffect, useState } from 'react';
import styles from './ScheduleList.module.scss';
import MyScheduleCard from '../ScheduleCard/MyScheduleCard';
import {
  MyScheduleCardType,
  MyScheduleListType
} from '../../types/ScheduleTypes';
import ROUTER from '../../constants/Router';
import CreateScheduleModal from './Modal/CreateScheduleModal';
import tokenInstance from '../../apis/tokenInstance';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function MyScheduleLists() {
  const [scheduleList, setScheduleList] = useState<MyScheduleListType>([]);
  const [scheduleSort, setScheduleSort] = useState<string>('upcoming');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await tokenInstance.get(`${baseUrl}/users/me/schedules`);
      setScheduleList(response.data);
    } catch (error: unknown) {
      console.log('내 일정을 불러올 수 없습니다.', error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    setScheduleSort(sortOption);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.scheduleListTitle}>나의 여행 일정</div>
      <div className={styles.scheduleFilter}>
        <button
          className={`${styles.sortButton} ${
            scheduleSort === 'upcoming' ? styles.selected : ''
          }`}
          onClick={(e) => {
            handleSort(e);
          }}
          value='upcoming'
        >
          다가오는 일정
        </button>
        <button
          className={`${styles.sortButton} ${
            scheduleSort === 'past' ? styles.selected : ''
          }`}
          onClick={(e) => {
            handleSort(e);
          }}
          value='past'
        >
          지난 일정
        </button>
        <button
          className={`${styles.sortButton} ${
            scheduleSort === 'like' ? styles.selected : ''
          }`}
          onClick={(e) => {
            handleSort(e);
          }}
          value='like'
        >
          좋아요 한 일정
        </button>
      </div>
      <div className={styles.scheduleCardContainer}>
        {!isLoading && (
          <button className={styles.scheduleAdd} onClick={openModal}>
            일정 추가하기
          </button>
        )}
        {isModalOpen && (
          <CreateScheduleModal closeModal={() => setIsModalOpen(false)} />
        )}
        {isLoading && <div className={styles.loading}>일정 불러오는중...</div>}
        {scheduleList.map((schedule: MyScheduleCardType, index: number) => (
          <MyScheduleCard
            schedule={schedule}
            key={index}
            link={ROUTER.SCHEDULE_DETAIL}
          />
        ))}
      </div>
    </div>
  );
}

export default MyScheduleLists;
