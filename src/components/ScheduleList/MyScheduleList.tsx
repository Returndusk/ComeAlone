import React, { useCallback, useEffect, useState } from 'react';
import styles from './ScheduleList.module.scss';
import MyScheduleCard from '../ScheduleCard/MyScheduleCard';
import axios from 'axios';
import ScheduleListDummy from './ScheduleListDummy';
import {
  MyScheduleCardType,
  MyScheduleListType
} from '../../types/ScheduleTypes';
import ROUTER from '../../constants/Router';

function MyScheduleLists() {
  const [scheduleList, setScheduleList] = useState<MyScheduleListType>([]);
  const [scheduleSort, setScheduleSort] = useState<string>('upcoming');

  const fetchData = useCallback(async () => {
    const API_URL = 'http://localhost:9999/data';
    try {
      const reponse = await axios.get(API_URL);
      setScheduleList(reponse.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setScheduleList(ScheduleListDummy);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    setScheduleSort(sortOption);
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
        {scheduleList.map((schedule: MyScheduleCardType, index: number) => (
          <MyScheduleCard
            schedule={schedule}
            key={index}
            link={ROUTER.SCHEDULE_DETAIL}
          />
        ))}
        <div className={styles.scheduleAdd}>일정 추가하기</div>
      </div>
    </div>
  );
}

export default MyScheduleLists;
