import React, { useEffect, useState } from 'react';
import styles from './ModalScheduleLists.module.scss';
import ModalScheduleCard from './ModalScheduleCard';
import {
  ModalMyScheduleType,
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
  const [showScheduleList, setShowScheduleList] = useState<
    ModalMyScheduleType[]
  >([]);
  const [scheduleSort, setScheduleSort] = useState<string>('upcoming');
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);

  // console.log('scheduleLists', scheduleLists);
  // console.log('showScheduleList', showScheduleList);

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

  useEffect(() => {
    sortSchedule(scheduleSort);
  }, [scheduleSort, scheduleLists]);

  // console.log(scheduleLists);

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    setScheduleSort(sortOption);
  }

  function sortUpcoming(scheduleData: ModalMyScheduleType[]) {
    return scheduleData
      .filter((schedule: ModalMyScheduleType) => {
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 1));
        const end_date = new Date(schedule.end_date);
        return yesterday < end_date;
      })
      .sort(
        (a, b) =>
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      );
  }

  function sortPast(scheduleData: ModalMyScheduleType[]) {
    return scheduleData
      .filter((schedule: ModalMyScheduleType) => {
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 1));
        const end_date = new Date(schedule.end_date);
        return yesterday > end_date;
      })
      .sort(
        (a, b) =>
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );
  }

  function sortSchedule(sortOption: string) {
    // const scheduleData = [...scheduleLists];
    const scheduleData = scheduleLists.map((item) => item.schedule);
    if (sortOption === 'upcoming') {
      setShowScheduleList(sortUpcoming(scheduleData));
    } else {
      setShowScheduleList(sortPast(scheduleData));
    }
  }

  function handleShowDestinations(day: number) {
    if (selectedCardIdx === day) {
      setSelectedCardIdx(null);
    } else {
      setSelectedCardIdx(day);
    }
  }
  // console.log(selectedCardIdx);

  // function handleCloseDestinations() {
  //   setSelectedCardIdx(null);
  // }

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
        {/* {scheduleLists.map((scheduleList, index) => ( */}
        {showScheduleList.map((scheduleList, index) => (
          <ModalScheduleCard
            key={scheduleList.schedule_id}
            schedule={scheduleList}
            index={index}
            isSelected={selectedCardIdx === index}
            onShowDestinations={handleShowDestinations}
            // onCloseDestinations={handleCloseDestinations}
            scheduleId={scheduleList.schedule_id}
          />
        ))}
      </div>
    </div>
  );
}
