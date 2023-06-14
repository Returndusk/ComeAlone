import React, { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from './ScheduleList.module.scss';
import ScheduleCard from '../ScheduleCard/ScheduleCard';
import { ScheduleCardType, ScheduleListType } from '../../types/ScheduleTypes';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';
import images from '../../constants/image';
import tokenInstance from '../../apis/tokenInstance';
import { FaExclamationCircle } from 'react-icons/fa';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function ScheduleLists() {
  const { authState } = useAuthState();
  const isLoggedIn = authState.isLoggedIn;
  const [likesScheduleList, setLikesScheduleList] = useState<ScheduleListType>(
    []
  );
  const [recentScheduleList, setRecentScheduleList] =
    useState<ScheduleListType>([]);
  const [showScheduleList, setShowScheduleList] = useState<ScheduleListType>(
    []
  );
  const [scheduleSort, setScheduleSort] = useState<string>('likes');
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [likesPage, setLikesPage] = useState<number>(1);
  const [recentPage, setRecentPage] = useState<number>(1);
  const [lastDataOfLikes, setLastDataOfLikes] = useState<boolean>(false);
  const [lastDataOfRecent, setLastDataOfRecent] = useState<boolean>(false);
  const lastElement = useRef<HTMLDivElement>(null);
  const SCHEDULES_PER_PAGE = 6;

  const fetchLikesData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/schedules/public/order/likes?page=${likesPage}&limit=${SCHEDULES_PER_PAGE}`
      );
      const scheduleData = response.data;
      setLikesScheduleList((prev) => [...prev, ...scheduleData]);
      if (scheduleData.length === 0) {
        setLastDataOfLikes(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setShowAlertModal(true);
      }
    }
  }, [likesPage, scheduleSort]);

  const fetchRecentData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/schedules/public/order/latest-created-date?page=${recentPage}&limit=${SCHEDULES_PER_PAGE}`
      );
      const scheduleData = response.data;
      setRecentScheduleList((prev) => [...prev, ...scheduleData]);
      if (scheduleData.length === 0) {
        setLastDataOfRecent(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setShowAlertModal(true);
      }
    }
  }, [recentPage, scheduleSort]);

  useEffect(() => {
    if (scheduleSort === 'likes') {
      if (!lastDataOfLikes) {
        fetchLikesData();
      }
    } else if (scheduleSort === 'recent') {
      if (!lastDataOfRecent) {
        fetchRecentData();
      }
    }
  }, [
    fetchLikesData,
    fetchRecentData,
    likesPage,
    recentPage,
    lastDataOfLikes,
    lastDataOfRecent
  ]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (lastElement.current) {
      observer = new IntersectionObserver(
        (entry) => {
          if (entry[0].isIntersecting) {
            nextPage(scheduleSort);
          }
        },
        { threshold: 1 }
      );
      observer.observe(lastElement.current);
    }
    return () => observer && observer.disconnect();
  }, [lastElement, scheduleSort]);

  const nextPage = useCallback(
    (scheduleSort: string) => {
      if (scheduleSort === 'likes') {
        setLikesPage((prev) => prev + 1);
      } else if (scheduleSort === 'recent') {
        setRecentPage((prev) => prev + 1);
      }
    },
    [likesPage, recentPage]
  );

  async function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    setScheduleSort(sortOption);
    if (sortOption === 'liked') {
      const liked = await tokenInstance.get(
        `${baseUrl}/users/me/liked-schedules`
      );
      setShowScheduleList(liked.data);
    }
  }

  useEffect(() => {
    if (scheduleSort === 'likes') {
      setShowScheduleList(likesScheduleList);
    } else if (scheduleSort === 'recent') {
      setShowScheduleList(recentScheduleList);
    }
  }, [scheduleSort, likesScheduleList, recentScheduleList]);

  function handleOnConfirm() {
    setShowAlertModal(false);
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
          <h2>마음에 드는 일정을 찾아보세요</h2>
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
        <div className={styles.scheduleCardContainer}>
          {scheduleSort != 'liked' ? (
            showScheduleList.length ? (
              showScheduleList.map(
                (schedule: ScheduleCardType, index: number) => (
                  <ScheduleCard schedule={schedule} key={index} />
                )
              )
            ) : (
              <div className={styles.noSchedule}>
                <FaExclamationCircle />
                <div>공개된 일정이 없습니다</div>
              </div>
            )
          ) : showScheduleList.length ? (
            showScheduleList.map(
              (schedule: ScheduleCardType, index: number) => (
                <ScheduleCard schedule={schedule} key={index} />
              )
            )
          ) : (
            <div className={styles.noSchedule}>
              <FaExclamationCircle />
              <div>좋아요 한 일정이 없습니다</div>
            </div>
          )}
        </div>
      </div>
      <div ref={lastElement} className={styles.lastElement}></div>
    </>
  );
}

export default ScheduleLists;
