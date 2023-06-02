import React, { useState } from 'react';
import styles from './ModalScheduleCard.module.scss';
import { ScheduleType } from '../../ScheduleList/ScheduleList';

export default function ModalScheduleCard(
  schedule: ScheduleType,
  index: number
) {
  const endDate = new Date(schedule.end_date);
  const startDate = new Date(schedule.start_date);
  const createdAt = schedule.createdAt;
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDate = Math.floor(diffTime / (24 * 60 * 60 * 1000));

  const [isOpen, setIsOpen] = useState(false);

  /**
   * 해당 카드를 클릭했을 때 destinations N일차 별로 불러오는 함수
   * TODO:
   * N일차 별로 분기하기
   * 다른 카드 눌렀을 때 이전 카드내용은 숨기기
   */
  function handleShowDestinations() {
    setIsOpen(true);
  }

  function handleCloseDestinations() {
    setIsOpen(false);
  }

  return (
    <>
      <div
        key={index}
        className={styles.scheduleCard}
        onClick={handleShowDestinations}
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
      {isOpen && (
        <div className={styles.scheduleDestination}>
          {schedule.destinations.map(
            (spot, idx) => `${idx + 1}일차 : [${spot}]`
          )}
          {/* {schedule.destinations.join('=>')} */}
        </div>
      )}
    </>
  );
}
