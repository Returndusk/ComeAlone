import React, { useCallback, useEffect, useState } from 'react';
import styles from './ScheduleList.module.scss';
import MyScheduleCard from '../ScheduleCard/MyScheduleCard';
import {
  MyScheduleCardType,
  MyScheduleListType
} from '../../types/ScheduleTypes';
import CreateScheduleModal from './Modal/CreateScheduleModal';
import tokenInstance from '../../apis/tokenInstance';
import AlertModal from '../common/Alert/AlertModal';
import images from '../../constants/image';
import Loading from '../../components/common/Loading/ScheduleListLoading';
import { UPCOMING_FILTER, PAST_FILTER } from '../../constants/ScheduleList';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function MyScheduleLists() {
  const [scheduleList, setScheduleList] = useState<MyScheduleListType>([]);
  const [showScheduleList, setShowScheduleList] = useState<MyScheduleListType>(
    []
  );
  const [scheduleSort, setScheduleSort] = useState<string>(UPCOMING_FILTER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await tokenInstance.get(`${baseUrl}/users/me/schedules`);
      const scheduleData = response.data;
      setScheduleList(scheduleData);
      setShowScheduleList(sortUpcoming(scheduleData));
    } catch (error: unknown) {
      setShowAlertModal(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    sortSchedule(scheduleSort);
  }, [scheduleSort, scheduleList]);

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    setScheduleSort(sortOption);
  }

  function sortUpcoming(scheduleData: MyScheduleCardType[]) {
    return scheduleData
      .filter((schedule: MyScheduleCardType) => {
        const today = new Date();
        const end_date = new Date(schedule.end_date);
        end_date.setDate(end_date.getDate() + 1);
        end_date.setHours(0);
        return today < end_date;
      })
      .sort(
        (a, b) =>
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      );
  }

  function sortPast(scheduleData: MyScheduleCardType[]) {
    return scheduleData
      .filter((schedule: MyScheduleCardType) => {
        const today = new Date();
        const end_date = new Date(schedule.end_date);
        end_date.setDate(end_date.getDate() + 1);
        end_date.setHours(0);
        return today > end_date;
      })
      .sort(
        (a, b) =>
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );
  }

  function sortSchedule(sortOption: string) {
    const scheduleData = [...scheduleList];
    if (sortOption === UPCOMING_FILTER) {
      setShowScheduleList(sortUpcoming(scheduleData));
    } else {
      setShowScheduleList(sortPast(scheduleData));
    }
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function handleOnConfirm() {
    setShowAlertModal(false);
  }

  function handleAddToBrowser(schedule: MyScheduleCardType) {
    setScheduleList((prev) => [...prev, schedule]);
  }

  return (
    <>
      <div className={styles.imageContainer}>
        <img
          src={images[1]}
          alt='내 일정 메인 이미지'
          className={styles.scheduleListImage}
        />
        <div className={styles.scheduleListTitle}>
          <h1>나의 여행 일정</h1>
          <h2>일정을 만들고 공유해보세요</h2>
        </div>
      </div>
      <div className={styles.scheduleContainer}>
        <div className={styles.scheduleFilter}>
          <button
            className={`${styles.sortButton} ${
              scheduleSort === UPCOMING_FILTER && styles.selected
            }`}
            onClick={(e) => {
              handleSort(e);
            }}
            value={UPCOMING_FILTER}
          >
            다가오는 일정
          </button>
          <button
            className={`${styles.sortButton} ${
              scheduleSort === PAST_FILTER && styles.selected
            }`}
            onClick={(e) => {
              handleSort(e);
            }}
            value={PAST_FILTER}
          >
            지난 일정
          </button>
        </div>
        {showAlertModal && (
          <AlertModal
            message='내 여행 일정을 불러올 수 없습니다.'
            onConfirm={handleOnConfirm}
          />
        )}
        <div className={styles.scheduleCardContainer}>
          {!isLoading && (
            <button className={styles.scheduleAdd} onClick={openModal}>
              일정 추가하기
            </button>
          )}
          {isModalOpen && (
            <CreateScheduleModal
              closeModal={() => setIsModalOpen(false)}
              onAdd={handleAddToBrowser}
            />
          )}
          {isLoading && <Loading />}
          {!isLoading &&
            showScheduleList.map(
              (schedule: MyScheduleCardType, index: number) => (
                <MyScheduleCard schedule={schedule} key={index} />
              )
            )}
        </div>
      </div>
    </>
  );
}

export default MyScheduleLists;
