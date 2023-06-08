import React, { useEffect, useState } from 'react';
import styles from './ModalScheduleLists.module.scss';
// import dummy from '../../ScheduleList/ScheduleListDummy';
import ModalScheduleCard from './ModalScheduleCard';
import {
  ModalScheduleCardType,
  MyScheduleListType
} from '../../../types/ModalScheduleTypes';
import axios from 'axios';

async function getMyScheduleLists() {
  const response = await axios.get<MyScheduleListType>(
    'https://vvhooping.com/api/schedules/24'
  );
  const data = response.data;
  // console.log(data);
  return data;
}

export default function ModalScheduleLists() {
  const [scheduleList, setScheduleList] = useState<ModalScheduleCardType[]>([]);
  const [scheduleSort, setScheduleSort] = useState<string>('likes');
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);

  useEffect(() => {
    async function getScheduleLists() {
      try {
        const data = await getMyScheduleLists();
        console.log(data);
        setScheduleList(
          data.map((schedule, index) => ({
            schedule,
            index,
            isSelected: selectedCardIdx === index,
            onShowDestinations: handleShowDestinations
          }))
        );
      } catch (err) {
        console.error('Error: ', err);
      }
    }

    getScheduleLists();
  }, [selectedCardIdx]);

  console.log(scheduleList);

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    // console.log(sortOption);
    setScheduleSort(sortOption);
  }

  function handleShowDestinations(day: number) {
    setSelectedCardIdx(day);
  }
  // console.log(selectedCardIdx);

  // function handleCloseDestinations() {
  //   setSelectedCardIdx(null);
  // }
  // console.log(scheduleList);

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
          <ModalScheduleCard
            key={schedule.schedule.schedule_id}
            schedule={schedule.schedule}
            index={index}
            isSelected={selectedCardIdx === index}
            onShowDestinations={handleShowDestinations}
            // onCloseDestinations={handleCloseDestinations}
          />
        ))}
      </div>
    </div>
  );
}
