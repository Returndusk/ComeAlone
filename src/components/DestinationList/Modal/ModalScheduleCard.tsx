import React, { useState } from 'react';
import styles from './ModalScheduleCard.module.scss';
import { ModalScheduleCardType } from '../../../types/ModalScheduleTypes';
import AddToScheduleModal from './AddToScheduleModal';

function getDate(dateString: string) {
  const toDate = new Date(dateString);
  const year = toDate.getFullYear();
  const month = toDate.getMonth() + 1;
  const day = toDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
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
  const createdAt = getDate(schedule.created_at);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDate = Math.floor(diffTime / (24 * 60 * 60 * 1000));
  // N일차
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  // const [updatedDestinations, setUpdatedDestinations] = useState<string[][]>([
  //   ...schedule.destinations
  // ]);

  function handleToggleDestinations(dayIndex: number) {
    // 선택시점에는 dayIndex !== selectedDay
    setSelectedDay(selectedDay === dayIndex ? null : dayIndex);
  }

  // console.log(updatedDestination);
  // function handleDestinationUpdate(updatedDestination: string[]) {
  //   if (selectedDay !== null) {
  //     setUpdatedDestinations((prevDestinations) => {
  //       const updatedDestinations = [...prevDestinations];
  //       updatedDestinations[selectedDay] = updatedDestination;
  //       return updatedDestinations;
  //     });
  //   }
  // }

  // console.log(schedule.destinations);

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
            <div className={styles.scheduleCreated}>등록 : {createdAt}</div>
          </div>
          <div className={styles.scheduleLike}>❤ 좋아요 수</div>
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
