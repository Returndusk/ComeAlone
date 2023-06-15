import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ScheduleList.module.scss';
import ScheduleCard from '../ScheduleCard/ScheduleCard';
import { ScheduleCardType, ScheduleListType } from '../../types/ScheduleTypes';
import AlertModal from '../common/Alert/AlertModal';
import tokenInstance from '../../apis/tokenInstance';
import { FaExclamationCircle } from 'react-icons/fa';
import Loading from '../../components/common/Loading/ScheduleListLoading';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function LikedScheduleLists() {
  const [showScheduleList, setShowScheduleList] = useState<ScheduleListType>(
    []
  );
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await tokenInstance.get(
        `${baseUrl}/users/me/liked-schedules`
      );
      const scheduleData = response.data;
      setShowScheduleList(scheduleData);
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
        {showScheduleList.length
          ? showScheduleList.map(
              (schedule: ScheduleCardType, index: number) => (
                <ScheduleCard schedule={schedule} key={index} />
              )
            )
          : !isLoading && (
              <div className={styles.noSchedule}>
                <FaExclamationCircle />
                <div>좋아요 한 일정이 없습니다</div>
              </div>
            )}
        {isLoading && <Loading />}
      </div>
      <div className={styles.lastElement}></div>
    </>
  );
}

export default LikedScheduleLists;
