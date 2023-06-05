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
  image: string;
};

type ScheduleListType = ScheduleType[];

export default function ModalScheduleLists() {
  const [scheduleList, setScheduleList] = useState<ScheduleListType>(dummy);
  const [scheduleSort, setScheduleSort] = useState<string>('likes');
  // const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);
  // console.log(scheduleList);

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    // console.log(sortOption);
    setScheduleSort(sortOption);
  }

  function handleShowDestinations(day: number) {
    // setSelectedDay(day);
    setSelectedCardIdx(day);
    console.log(scheduleList);
  }

  function handleCloseDestinations() {
    // setSelectedDay(null);
    setSelectedCardIdx(null);
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
        {scheduleList.map((schedule, index) => (
          // console.log(schedule);
          <ModalScheduleCard
            key={schedule.id}
            schedule={schedule}
            index={index}
            // selectedDay={selectedDay}
            isSelected={selectedCardIdx === index}
            onShowDestinations={handleShowDestinations}
            onCloseDestinations={handleCloseDestinations}
          />
        ))}
        {/* <div className={styles.scheduleAdd}>일정 추가하기</div> */}
      </div>
    </div>
  );
}
