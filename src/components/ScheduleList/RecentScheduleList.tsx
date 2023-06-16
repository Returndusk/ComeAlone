import React, { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from './ScheduleList.module.scss';
import ScheduleCard from '../ScheduleCard/ScheduleCard';
import { ScheduleCardType, ScheduleListType } from '../../types/ScheduleTypes';
import AlertModal from '../common/Alert/AlertModal';
import { FaExclamationCircle } from 'react-icons/fa';
import Loading from '../../components/common/Loading/ScheduleListLoading';
import { SCHEDULES_PER_PAGE } from '../../constants/ScheduleList';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const INITIAL_PAGE = 1;

function RecentScheduleLists() {
  const [recentScheduleList, setRecentScheduleList] =
    useState<ScheduleListType>([]);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [recentPage, setRecentPage] = useState<number>(INITIAL_PAGE);
  const [lastDataOfRecent, setLastDataOfRecent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lastElement = useRef<HTMLDivElement>(null);
  const fetchDataTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRecentData = useCallback(async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, [recentPage]);

  useEffect(() => {
    return () => {
      clearTimeout(fetchDataTimeoutRef.current as NodeJS.Timeout);
    };
  }, []);

  useEffect(() => {
    if (!lastDataOfRecent) {
      fetchRecentData();
    }
  }, [fetchRecentData, recentPage, lastDataOfRecent]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (lastElement.current) {
      observer = new IntersectionObserver(
        (entry) => {
          clearTimeout(fetchDataTimeoutRef.current as NodeJS.Timeout);
          fetchDataTimeoutRef.current = setTimeout(() => {
            if (entry[0].isIntersecting) {
              nextPage();
            }
          }, 200);
        },
        { threshold: 1 }
      );
      observer.observe(lastElement.current);
    }
    return () => observer && observer.disconnect();
  }, [lastElement]);

  const nextPage = useCallback(() => {
    setRecentPage((prev) => prev + 1);
  }, []);

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
        {recentScheduleList.length
          ? recentScheduleList.map(
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

export default RecentScheduleLists;
