/**
 * 지원님 카드 컴포넌트에서 필요한 부분만 빼서 사용하는걸로
 * 일정명, 기간 정도만 알려주고 클릭하면 N일차 목적지들 나오게
 */

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
  destinations: string[];
  likes: number;
};

type ScheduleListType = ScheduleType[];

export default function ModalScheduleLists() {
  const [scheduleList, setScheduleList] = useState<ScheduleListType>(dummy);
  const [scheduleSort, setScheduleSort] = useState<string>('likes');
  // const [destinations, setDestinations] = useState<string[]>([]);

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    console.log(sortOption);
    setScheduleSort(sortOption);
  }

  // function handleOpenSchedules(destinations: string[]) {
  //   setDestinations(destinations);
  // }

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
        {scheduleList.map((schedule, index) =>
          ModalScheduleCard(schedule, index)
        )}
        {/* <div className={styles.scheduleAdd}>일정 추가하기</div> */}
      </div>
      {/* {destinations.length > 0 && (
        <div className={styles.destinations}>
          선택한 목적지: {destinations.join(' => ')}
        </div>
      )} */}
    </div>
  );
}
