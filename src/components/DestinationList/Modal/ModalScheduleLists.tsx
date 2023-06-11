import React, { useEffect, useState } from 'react';
import styles from './ModalScheduleLists.module.scss';
import ModalScheduleCard from './ModalScheduleCard';
import {
  ModalScheduleCardType,
  MyScheduleListType
} from '../../../types/ModalScheduleTypes';
import tokenInstance from '../../../apis/tokenInstance';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

async function getMyScheduleLists() {
  const response = await tokenInstance.get<MyScheduleListType>(
    `${baseUrl}/users/me/schedules`
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
        console.log(data);
        setScheduleLists(
          data.map((schedule, index) => ({
            schedule,
            index,
            isSelected: selectedCardIdx === index,
            onShowDestinations: handleShowDestinations,
            scheduleId: schedule.schedule_id
          }))
        );
      } catch (err) {
        console.error('Error: ', err);
      }
    }

    getScheduleLists();
  }, [selectedCardIdx]);

  // console.log(scheduleLists);

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
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
      {/* <div className={styles.scheduleListTitle}>여행 일정</div> */}
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
      </div>
      <div className={styles.scheduleCardContainer}>
        {scheduleLists.map((scheduleList, index) => (
          <ModalScheduleCard
            key={scheduleList.schedule.schedule_id}
            schedule={scheduleList.schedule}
            index={index}
            isSelected={selectedCardIdx === index}
            onShowDestinations={handleShowDestinations}
            // onCloseDestinations={handleCloseDestinations}
            scheduleId={scheduleList.schedule.schedule_id}
          />
        ))}
      </div>
    </div>
  );
}
