import React, { useState } from 'react';
import styles from './ModalScheduleCard.module.scss';
import { ScheduleType } from '../../ScheduleList/ScheduleList';

type ModalScheduleCardProps = {
  schedule: ScheduleType;
  index: number;
  // selectedDay: number | null;
  isSelected: boolean;
  onShowDestinations: (index: number) => void;
  onCloseDestinations: () => void;
};

export default function ModalScheduleCard({
  schedule,
  index,
  // selectedDay,
  isSelected,
  onShowDestinations,
  onCloseDestinations
}: ModalScheduleCardProps) {
  const endDate = new Date(schedule.end_date);
  const startDate = new Date(schedule.start_date);
  const createdAt = schedule.createdAt;
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDate = Math.floor(diffTime / (24 * 60 * 60 * 1000));
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  /**
   * 해당 카드를 클릭했을 때 destinations N일차 별로 불러오는 함수
   * TODO:
   * N일차 별로 분기하기
   * 다른 카드 눌렀을 때 이전 카드내용은 숨기기
   */

  function handleToggleDestinations(dayIndex: number) {
    // setIsOpen(!isOpen);
    console.log('destinationList', schedule.destinations);
    setSelectedDay(selectedDay === dayIndex ? null : dayIndex);
  }

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
          <div className={styles.scheduleLike}>❤ {schedule.likes}</div>
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
      {/* {selectedDay !== null && selectedDay === index && ( */}
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
        </div>
      )}
    </>
  );
}
