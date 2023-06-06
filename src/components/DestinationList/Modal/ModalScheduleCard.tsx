import React, { useState } from 'react';
import styles from './ModalScheduleCard.module.scss';
import { MyScheduleCardType } from '../../../types/ScheduleTypes';
import AddToScheduleModal from './AddToScheduleModal';

type ModalScheduleCardProps = {
  schedule: MyScheduleCardType;
  index: number;
  isSelected: boolean;
  onShowDestinations: (index: number) => void;
  onCloseDestinations: () => void;
};

export default function ModalScheduleCard({
  schedule,
  index,
  isSelected,
  onShowDestinations,
  onCloseDestinations
}: ModalScheduleCardProps) {
  const endDate = new Date(schedule.end_date);
  const startDate = new Date(schedule.start_date);
  const createdAt = schedule.created_at;
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDate = Math.floor(diffTime / (24 * 60 * 60 * 1000));
  // N일차
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  function handleToggleDestinations(dayIndex: number) {
    // 선택시점에는 dayIndex !== selectedDay
    setSelectedDay(selectedDay === dayIndex ? null : dayIndex);
  }
  // console.log('selectedDay', selectedDay);
  // console.log('dayIndex', dayIndex);
  // console.log(schedule.destinations[selectedDay]);

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
            {/* <div className={styles.scheduleDescription}>
            {schedule.description}
          </div> */}
            <div className={styles.scheduleDate}>
              {diffDate}박 {diffDate + 1}일
            </div>
            {/* <div className={styles.scheduleAuthor}>
            작성자 : {schedule.createdBy}
          </div> */}
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
        <div className={styles.scheduleDestination}>
          {/* <button className={styles.closeBtn} onClick={onCloseDestinations}>
            닫기
          </button> */}
          <div className={styles.destinationList}>
            {schedule.destinations[selectedDay].map((destination, idx) => (
              <div key={idx}>{destination}</div>
            ))}
          </div>
          <AddToScheduleModal />
        </div>
      )}
    </>
  );
}
