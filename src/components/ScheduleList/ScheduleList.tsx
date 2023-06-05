import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ScheduleList.module.scss';
import ScheduleCard from '../ScheduleCard/ScheduleCard';
import ScheduleListDummy from './ScheduleListDummy';
import ROUTER from '../../constants/Router';
import { ScheduleCardType, ScheduleListType } from '../../types/ScheduleTypes';

function ScheduleLists() {
  const [scheduleList, setScheduleList] = useState<ScheduleListType>([]);
  const [scheduleSort, setScheduleSort] = useState<string>('likes');

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
      <div className={styles.scheduleListTitle}>여행 일정</div>
      <div className={styles.scheduleFilter}>
        <button
          className={`${styles.sortButton} ${
            scheduleSort === 'likes' ? styles.selected : ''
          }`}
          onClick={(e) => {
            handleSort(e);
          }}
          value='likes'
        >
          인기순
        </button>
        <button
          className={`${styles.sortButton} ${
            scheduleSort === 'recent' ? styles.selected : ''
          }`}
          onClick={(e) => {
            handleSort(e);
          }}
          value='recent'
        >
          최신순
        </button>
      </div>
      <div className={styles.scheduleCardContainer}>
        {scheduleList.map((schedule: ScheduleCardType, index: number) => (
          <ScheduleCard
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

export default ScheduleLists;
