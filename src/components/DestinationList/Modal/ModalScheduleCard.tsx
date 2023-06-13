import React, { useState, useEffect } from 'react';
import styles from './ModalScheduleCard.module.scss';
import { ModalScheduleCardType } from '../../../types/ModalScheduleTypes';
import AddToScheduleModal from './AddToScheduleModal';
import { createPortal } from 'react-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';

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
  const isSameDay = startDate.getTime() === endDate.getTime();

  // N일차
  const [selectedDay, setSelectedDay] = useState<number | null>(0);
  const [scheduleDetailsDomRoot, setScheduleDetailsDomRoot] =
    useState<HTMLElement | null>(null);
  const [startDay, setStartDay] = useState(0);
  const visibleDays = 5;

  function handleToggleDestinations(dayIndex: number) {
    setSelectedDay(dayIndex);
  }

  function handlePrevious() {
    setStartDay(Math.max(0, startDay - visibleDays));
  }

  function handleNext() {
    setStartDay(
      Math.min(
        schedule.destinations.length - visibleDays,
        startDay + visibleDays
      )
    );
  }

  useEffect(() => {
    setScheduleDetailsDomRoot(() =>
      document.getElementById('scheduleContainer')
    );
  }, []);

  // console.log('schedule', schedule);

  return (
    <div className={styles.scheduleCardLists}>
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
              {isSameDay ? '당일치기' : `${diffDate}박 ${diffDate + 1}일`}
            </div>
            <div>
              {/* {getDate(schedule.start_date, schedule.end_date)} */}
              {isSameDay
                ? `${startDate.getFullYear()}년 ${
                    startDate.getMonth() + 1
                  }월 ${startDate.getDate()}일`
                : getDate(schedule.start_date, schedule.end_date)}
            </div>
            {/* <div className={styles.scheduleCreated}>등록 : {createdAt}</div> */}
          </div>
        </div>
      </div>
      {isSelected &&
        scheduleDetailsDomRoot !== null &&
        createPortal(
          <div className={styles.scheduleDestination}>
            <div className={styles.daysContainer}>
              {startDay > 0 && (
                <button
                  className={`${styles.arrowBtn} ${styles.prevBtn}`}
                  onClick={handlePrevious}
                >
                  <SlArrowLeft />
                </button>
              )}
              <div className={styles.buttonContainer}>
                {/* {schedule.destinations.map((_, idx) => ( */}
                {schedule.destinations
                  .slice(startDay, startDay + visibleDays)
                  .map((_, idx) => (
                    <ButtonGroup
                      key={idx}
                      variant='outlined'
                      aria-label='outlined button group'
                      className={styles.dayButton}
                      // onClick={() => handleToggleDestinations(idx)}
                      onClick={() => handleToggleDestinations(startDay + idx)}
                    >
                      {/* <Button>{`${idx + 1}일차`}</Button> */}
                      <Button
                        sx={{
                          color: '#ef6d00',
                          fontWeight: '600',
                          '&:hover': {
                            color: '#ffffff',
                            backgroundColor: '#ef6d00',
                            border: 1,
                            borderColor: '#ef6d00'
                          },
                          border: 1,
                          borderColor: '#ef6d00'
                        }}
                      >{`${startDay + idx + 1}일차`}</Button>
                    </ButtonGroup>
                  ))}
              </div>
              {startDay + visibleDays < schedule.destinations.length && (
                <button
                  className={`${styles.arrowBtn} ${styles.nextBtn}`}
                  onClick={handleNext}
                >
                  <SlArrowRight />
                </button>
              )}
            </div>
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
          </div>,

          scheduleDetailsDomRoot
        )}
    </div>
  );
}
