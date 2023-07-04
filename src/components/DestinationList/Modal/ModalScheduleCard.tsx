import React, { useState, useEffect } from 'react';
import styles from './ModalScheduleCard.module.scss';
import { ModalScheduleCardType } from '../../../types/ModalScheduleTypes';
import AddToScheduleModal from './AddToScheduleModal';
import { createPortal } from 'react-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { TfiArrowCircleRight, TfiArrowCircleLeft } from 'react-icons/tfi';

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
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${schedule.image})`
        }}
        onClick={() => onShowDestinations(index)}
      >
        <div className={styles.scheduleContent}>
          <div className={styles.scheduleText}>
            <div className={styles.scheduleTitle}>{schedule.title}</div>
            <div className={styles.scheduleDate}>
              {isSameDay ? '당일치기' : `${diffDate}박 ${diffDate + 1}일`}
            </div>
            <div className={styles.scheduleDuration}>
              {isSameDay
                ? `${startDate.getFullYear()}년 ${
                    startDate.getMonth() + 1
                  }월 ${startDate.getDate()}일`
                : getDate(schedule.start_date, schedule.end_date)}
            </div>
          </div>
        </div>
      </div>

      {isSelected &&
        scheduleDetailsDomRoot !== null &&
        createPortal(
          <div className={styles.scheduleDestination}>
            <div className={styles.daysContainer}>
              <div className={styles.arrowSpace}>
                {startDay > 0 && (
                  <div
                    className={`${styles.arrowBtn} ${styles.prevBtn}`}
                    onClick={handlePrevious}
                  >
                    <TfiArrowCircleLeft />
                  </div>
                )}
              </div>
              <div className={styles.buttonContainer}>
                {/* {schedule.destinations.map((_, idx) => ( */}
                <ButtonGroup
                  // key={idx}
                  variant='outlined'
                  aria-label='outlined button group'
                  sx={{
                    '.MuiButtonGroup-grouped:not(:last-of-type)': {
                      borderColor: `var(--main-color)`
                      // borderRadius: 0
                    },
                    '.MuiButtonGroup-grouped:not(:first-of-type)': {
                      borderColor: `var(--main-color)`
                      // borderRadius: 0
                    }
                  }}
                  // className={styles.dayButton}
                >
                  {schedule.destinations
                    .slice(startDay, startDay + visibleDays)
                    .map((_, idx) => (
                      <Button
                        key={idx}
                        className={styles.dayButton}
                        sx={{
                          color:
                            selectedDay === startDay + idx
                              ? '#ffffff'
                              : `var(--main-color)`,
                          fontWeight: '600',
                          backgroundColor:
                            selectedDay === startDay + idx
                              ? `var(--main-color)`
                              : undefined,
                          '&:hover': {
                            color: '#ffffff',
                            backgroundColor: `var(--main-color)`
                          }
                        }}
                        onClick={() => handleToggleDestinations(startDay + idx)}
                      >{`${startDay + idx + 1}일차`}</Button>
                    ))}
                </ButtonGroup>
              </div>
              <div className={styles.arrowSpace}>
                {startDay + visibleDays < schedule.destinations.length && (
                  <div
                    className={`${styles.arrowBtn} ${styles.nextBtn}`}
                    onClick={handleNext}
                  >
                    <TfiArrowCircleRight />
                  </div>
                )}
              </div>
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
