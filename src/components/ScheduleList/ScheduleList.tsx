import React, { useState } from 'react';
import styles from './ScheduleList.module.scss';
import dummy from './ScheduleListDummy';
import { ScheduleCard } from '../ScheduleCard/ScheduleCard';

export type ScheduleType = {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  start_date: string;
  end_date: string;
  status: string;
  destinations: string[];
  likes: number;
};

type ScheduleListType = ScheduleType[];

export function ScheduleLists() {
  const [ScheduleList, setScheduleList] = useState<ScheduleListType>(dummy);
  const [scheduleSort, setScheduleSort] = useState<string>('likes');

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    console.log(sortOption);
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
        {ScheduleList.map((schedule, index) => ScheduleCard(schedule, index))}
        <div className={styles.scheduleAdd}>일정 추가하기</div>
      </div>
    </div>
  );
}
