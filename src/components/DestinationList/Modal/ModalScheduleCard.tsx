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
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  function handleToggleDestinations(dayIndex: number) {
    // 선택시점에는 dayIndex !== selectedDay
    setSelectedDay(selectedDay === dayIndex ? null : dayIndex);
  }

  // console.log('schedule', schedule);

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
          {schedule.destinations.map((_, idx) => (
            <button
              key={idx}
              className={styles.dayButton}
              onClick={() => handleToggleDestinations(idx)}
            >
              {`${idx + 1}일차`}
            </button>
          ))}
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
