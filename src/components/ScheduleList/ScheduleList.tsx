import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ScheduleList.module.scss';
import ScheduleCard from '../ScheduleCard/ScheduleCard';
import { ScheduleCardType, ScheduleListType } from '../../types/ScheduleTypes';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';
import images from '../../constants/image';
import tokenInstance from '../../apis/tokenInstance';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function ScheduleLists() {
  const { authState } = useAuthState();
  const isLoggedIn = authState.isLoggedIn;
  const [scheduleList, setScheduleList] = useState<ScheduleListType>([]);
  const [showScheduleList, setShowScheduleList] = useState<ScheduleListType>(
    []
  );
  const [scheduleSort, setScheduleSort] = useState<string>('likes');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/schedules`);
      const scheduleData = response.data;
      setScheduleList(scheduleData);
      setShowScheduleList(sortByScheduleLikes(scheduleData));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setShowAlertModal(true);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    sortSchedule(scheduleSort);
  }, [scheduleSort]);

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    setScheduleSort(sortOption);
  }

  function handleOnConfirm() {
    setShowAlertModal(false);
  }

  function sortByScheduleLikes(scheduleData: ScheduleCardType[]) {
    return scheduleData.sort((a, b) => b.likes_count - a.likes_count);
  }

  function sortByScheduleRecent(scheduleData: ScheduleCardType[]) {
    return scheduleData.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async function sortSchedule(sortOption: string) {
    const scheduleData = [...scheduleList];
    if (sortOption === 'likes') {
      setShowScheduleList(sortByScheduleLikes(scheduleData));
    } else if (sortOption === 'recent') {
      setShowScheduleList(sortByScheduleRecent(scheduleData));
    } else if (sortOption === 'liked') {
      const liked = await tokenInstance.get(
        `${baseUrl}/users/me/liked-schedules`
      );
      setShowScheduleList(liked.data);
    }
  }

  return (
    <>
      <div className={styles.imageContainer}>
        <img
          src={images[3]}
          alt='일정 메인 이미지'
          className={styles.scheduleListImage}
        />
        <div className={styles.scheduleListTitle}>
          <h1>여행 일정</h1>
        </div>
      </div>
      <div className={styles.scheduleContainer}>
        <div className={styles.scheduleFilter}>
          <button
            className={`${styles.sortButton} ${
              scheduleSort === 'likes' ? styles.selected : ''
            }`}
            onClick={(e) => {
              handleSort(e);
            }}
            value='likes'
          >
            인기순
          </button>
          <button
            className={`${styles.sortButton} ${
              scheduleSort === 'recent' ? styles.selected : ''
            }`}
            onClick={(e) => {
              handleSort(e);
            }}
            value='recent'
          >
            최신순
          </button>
          {isLoggedIn && (
            <button
              className={`${styles.sortButton} ${
                scheduleSort === 'liked' ? styles.selected : ''
              }`}
              onClick={(e) => {
                handleSort(e);
              }}
              value='liked'
            >
              좋아요 한 일정
            </button>
          )}
        </div>
        {showAlertModal && (
          <AlertModal
            message='여행 일정을 불러올 수 없습니다.'
            onConfirm={handleOnConfirm}
          />
        )}
        {isLoading && <div className={styles.loading}>일정 불러오는중...</div>}
        <div className={styles.scheduleCardContainer}>
          {showScheduleList.map((schedule: ScheduleCardType, index: number) => (
            <ScheduleCard schedule={schedule} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ScheduleLists;
