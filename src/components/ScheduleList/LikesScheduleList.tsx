import React, { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from './ScheduleList.module.scss';
import ScheduleCard from '../ScheduleCard/ScheduleCard';
import { ScheduleCardType, ScheduleListType } from '../../types/ScheduleTypes';
import AlertModal from '../common/Alert/AlertModal';
import { FaExclamationCircle } from 'react-icons/fa';
import Loading from '../../components/common/Loading/ScheduleListLoading';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function LikedScheduleLists() {
  const [likesScheduleList, setLikesScheduleList] = useState<ScheduleListType>(
    []
  );
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [likesPage, setLikesPage] = useState<number>(1);
  const [lastDataOfLikes, setLastDataOfLikes] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lastElement = useRef<HTMLDivElement>(null);
  const SCHEDULES_PER_PAGE = 6;

  const fetchLikesData = useCallback(async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, [likesPage]);

  useEffect(() => {
    if (!lastDataOfLikes) {
      fetchLikesData();
    }
  }, [fetchLikesData, likesPage, lastDataOfLikes]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (lastElement.current) {
      observer = new IntersectionObserver(
        (entry) => {
          if (entry[0].isIntersecting) {
            nextPage();
          }
        },
        { threshold: 1 }
      );
      observer.observe(lastElement.current);
    }
    return () => observer && observer.disconnect();
  }, [lastElement]);

  const nextPage = useCallback(() => {
    setLikesPage((prev) => prev + 1);
  }, [likesPage]);

  function handleOnConfirm() {
    setShowAlertModal(false);
  }

  return (
    <>
      {showAlertModal && (
        <AlertModal
          message='여행 일정을 불러올 수 없습니다.'
          onConfirm={handleOnConfirm}
        />
      )}
      <div className={styles.scheduleCardContainer}>
        {likesScheduleList.length
          ? likesScheduleList.map(
              (schedule: ScheduleCardType, index: number) => (
                <ScheduleCard schedule={schedule} key={index} />
              )
            )
          : !isLoading && (
              <div className={styles.noSchedule}>
                <FaExclamationCircle />
                <div>공개된 일정이 없습니다</div>
              </div>
            )}
        {isLoading && <Loading />}
      </div>
      <div ref={lastElement} className={styles.lastElement}></div>
    </>
  );
}

export default LikedScheduleLists;
