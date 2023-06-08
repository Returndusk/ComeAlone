import React, { useEffect, useState } from 'react';
import styles from './ModalScheduleLists.module.scss';
// import dummy from '../../ScheduleList/ScheduleListDummy';
import ModalScheduleCard from './ModalScheduleCard';
import {
  ModalScheduleCardType,
  MyScheduleListType
} from '../../../types/ModalScheduleTypes';
import tokenInstance from '../../../apis/tokenInstance';

async function getMyScheduleLists() {
  const response = await tokenInstance.get<MyScheduleListType>(
    'https://vvhooping.com/api/users/me/schedules'
  );
  const data = response.data;
  // console.log(data);
  return data;
}

export default function ModalScheduleLists() {
  const [scheduleLists, setScheduleLists] = useState<ModalScheduleCardType[]>(
    []
  );
  const [scheduleSort, setScheduleSort] = useState<string>('likes');
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);

  useEffect(() => {
    async function getScheduleLists() {
      try {
        const data = await getMyScheduleLists();
        // console.log(data);
        setScheduleLists(
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

  console.log(scheduleLists);
  // setScheduleLists;
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
  // console.log(scheduleLists);

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
        {scheduleLists.map((schedule, index) => (
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
