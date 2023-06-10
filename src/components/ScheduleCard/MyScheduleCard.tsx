import React, { useState } from 'react';
import styles from './ScheduleCard.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { MyScheduleCardType } from '../../types/ScheduleTypes';
import { FaRegDotCircle, FaTrashAlt } from 'react-icons/fa';
import { useAuthState } from '../../contexts/AuthContext';
import ROUTER from '../../constants/Router';
import tokenInstance from '../../apis/tokenInstance';
import AlertModal from '../common/Alert/AlertModal';

type MyScheduleCardProps = { schedule: MyScheduleCardType };

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function ScheduleCard({ schedule }: MyScheduleCardProps) {
  const { authState } = useAuthState();
  const isLoggedIn = authState.isLoggedIn;
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] =
    useState<boolean>(false);
  const [showDeleteAlertModal, setShowDeleteAlertModal] =
    useState<boolean>(false);
  const [showDeleteFailAlertModal, setShowDeleteFailAlertModal] =
    useState<boolean>(false);
  const navigate = useNavigate();

  async function handleDelete(e: React.MouseEvent<SVGElement>) {
    e.preventDefault();
    if (isLoggedIn) {
      setShowDeleteConfirmModal(true);
    } else {
      navigate(ROUTER.LOGIN);
    }
  }

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

  async function handleDeleteConfirm() {
    try {
      await tokenInstance.delete(
        `${baseUrl}/schedules/${schedule.schedule_id}`
      );
      setShowDeleteAlertModal(true);
    } catch (error) {
      setShowDeleteFailAlertModal(true);
    }
    setShowDeleteConfirmModal(false);
  }

  function handleDeleteCancel() {
    setShowDeleteConfirmModal(false);
  }

  function handleOnConfirm() {
    setShowDeleteAlertModal(false);
    setShowDeleteFailAlertModal(false);
    window.location.reload();
  }

  return (
    <>
      <Link
        to={`${ROUTER.SCHEDULE_DETAIL}/${schedule.schedule_id}`}
        className={styles.scheduleCard}
      >
        <div className={styles.scheduleCardContent}>
          <div className={styles.scheduleContent}>
            <div className={styles.scheduleText}>
              <div className={styles.scheduleTitle}>
                {schedule.title ? schedule.title : '여행 이름'}
              </div>
              <div>{schedule.summary ? schedule.summary : '여행 소개'}</div>
              <div>
                {schedule.duration - 1}박 {schedule.duration}일
              </div>
              <div>{getDate(schedule.start_date, schedule.end_date)}</div>
            </div>
            <div className={styles.icon}>
              <FaTrashAlt
                className={styles.trashIcon}
                onClick={(e) => {
                  handleDelete(e);
                }}
              />
            </div>
          </div>
          <div className={styles.scheduleDestination}>
            <div className={styles.destinationMap}>
              <FaRegDotCircle />
              <div className={styles.mapLineContainer}>
                <div className={styles.mapLine}></div>
              </div>
              <div className={styles.destinationCount}>
                경유{' '}
                {schedule.destination_count - 2 > 0
                  ? schedule.destination_count - 2
                  : 0}
              </div>
              <FaRegDotCircle />
            </div>
            <div className={styles.destinationText}>
              <div>
                {schedule.first_destination
                  ? schedule.first_destination
                  : '출발지 없음'}
              </div>
              <div>
                {schedule.last_destination
                  ? schedule.last_destination
                  : '도착지 없음'}
              </div>
            </div>
          </div>
          <img
            src={
              schedule.image
                ? schedule.image
                : 'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
            }
            className={styles.image}
            alt='일정 배경 사진'
          />
        </div>
      </Link>
      {showDeleteConfirmModal && (
        <AlertModal
          message='일정을 삭제하시겠습니까?'
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          showCancelButton={true}
        />
      )}
      {showDeleteAlertModal && (
        <AlertModal
          message='일정이 삭제되었습니다.'
          onConfirm={handleOnConfirm}
        />
      )}
      {showDeleteFailAlertModal && (
        <AlertModal
          message='일정 삭제를 실패하였습니다.'
          onConfirm={handleOnConfirm}
        />
      )}
    </>
  );
}

export default ScheduleCard;
