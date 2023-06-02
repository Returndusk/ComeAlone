import React, { useState } from 'react';
import styles from './ModalScheduleLists.module.scss';
import dummy from '../../ScheduleList/ScheduleListDummy';
import ModalScheduleCard from './ModalScheduleCard';

export type ScheduleType = {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  start_date: string;
  end_date: string;
  status: string;
  destinations: string[][];
  likes: number;
};

type ScheduleListType = ScheduleType[];

export default function ModalScheduleLists() {
  const [scheduleList, setScheduleList] = useState<ScheduleListType>(dummy);
  const [scheduleSort, setScheduleSort] = useState<string>('likes');
  // const [destinations, setDestinations] = useState<string[]>([]);
  console.log(scheduleList);

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    // console.log(sortOption);
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
        {scheduleList.map((schedule, index) => {
          // console.log(schedule);
          return ModalScheduleCard(schedule, index);
        })}
        {/* <div className={styles.scheduleAdd}>일정 추가하기</div> */}
      </div>
    </div>
  );
}
