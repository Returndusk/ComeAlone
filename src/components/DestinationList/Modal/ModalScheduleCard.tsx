import React, { useState } from 'react';
import styles from './ModalScheduleCard.module.scss';
import { ModalScheduleCardType } from '../../../types/ModalScheduleTypes';
import AddToScheduleModal from './AddToScheduleModal';

function getDate(startDateString: string, endDateString: string) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth() + 1;
  const startDay = startDate.getDate();
  const endMonth = endDate.getMonth() + 1;
  const endDay = endDate.getDate();
  return `${startYear}년 ${startMonth}월 ${startDay}일 ~ ${endMonth}월 ${endDay}일`;
}

export default function ModalScheduleCard({
  schedule,
  index,
  isSelected,
  onShowDestinations,
  scheduleId
}: // onCloseDestinations
ModalScheduleCardType) {
  const endDate = new Date(schedule.end_date);
  const startDate = new Date(schedule.start_date);
  // const createdAt = getDate(schedule.created_at);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDate = Math.floor(diffTime / (24 * 60 * 60 * 1000));
  // N일차
  const [selectedDay, setSelectedDay] = useState<number | null>(0);
  // const [selectedDay, setSelectedDay] = useState<number>(0);

  function handleToggleDestinations(dayIndex: number) {
    setSelectedDay(dayIndex);
    // setSelectedDay(selectedDay === dayIndex ? 0 : dayIndex);
  }

  // console.log('schedule', schedule);

  // const visibleDays = 5; // 보이는 일차 수
  // const totalDays = schedule.destinations.length; // 총 일정 일차 수
  // const startDay = Math.max(0, selectedDay - Math.floor(visibleDays / 2)); // 시작 일차 인덱스
  // const endDay = Math.min(totalDays - 1, startDay + visibleDays - 1); // 마지막 일차 인덱스

  return (
    <>
      <div
        key={index}
        className={styles.scheduleCard}
        // onClick={handleShowDestinations}
        onClick={() => onShowDestinations(index)}
      >
        <div className={styles.scheduleContent}>
          <div className={styles.scheduleText}>
            <div className={styles.scheduleTitle}>{schedule.title}</div>
            <div className={styles.scheduleDate}>
              {diffDate}박 {diffDate + 1}일
            </div>
            <div>{getDate(schedule.start_date, schedule.end_date)}</div>
            {/* <div className={styles.scheduleCreated}>등록 : {createdAt}</div> */}
          </div>
        </div>
      </div>
      {isSelected && (
        <div className={styles.scheduleDestination}>
          {/* {startDay > 0 && (
            <button
              className={styles.arrowButton}
              onClick={() => handleToggleDestinations(startDay - 1)}
            >
              &lt;
            </button>
          )} */}
          {/* {schedule.destinations.slice(startDay, endDay + 1).map((_, idx) => ( */}
          {schedule.destinations.map((_, idx) => (
            <button
              key={idx}
              className={styles.dayButton}
              // className={`${styles.dayButton} ${
              //   selectedDay === startDay + idx ? styles.selected : ''
              // }`}
              onClick={() => handleToggleDestinations(idx)}
              // onClick={() => handleToggleDestinations(startDay + idx)}
            >
              {`${idx + 1}일차`}
              {/* {`${startDay + idx + 1}일차`} */}
            </button>
          ))}
          {/* {totalDays > visibleDays && endDay < totalDays - 1 && (
            <button
              className={styles.arrowButton}
              onClick={() => handleToggleDestinations(endDay + 1)}
            >
              &gt;
            </button>
          )} */}
        </div>
      )}
      {isSelected && selectedDay !== null && (
        <AddToScheduleModal
          destinations={schedule.destinations}
          destinationIds={schedule.destinationIds}
          // onDestinationUpdate={handleDestinationUpdate}
          // schedule={schedule}
          selectedDay={selectedDay}
          scheduleId={scheduleId}
          // updatedDestinations={updatedDestinations}
        />
      )}
    </>
  );
}
