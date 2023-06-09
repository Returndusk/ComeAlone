import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CommonModalDesign.module.scss';
import { AddToScheduleModalType } from '../../../types/ModalScheduleTypes';
import axios from 'axios';
import tokenInstance from '../../../apis/tokenInstance';

/**
 * TODO
 * 1. 추가는 됐지만 N일차로 넘어갔을 때 reset되는 문제
 * 2. POST 요청 => .title이 아니고 .id
 */

function AddToScheduleModal({
  destinations,
  onDestinationUpdate,
  scheduleId
}: AddToScheduleModalType) {
  const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const contentid = Number(searchParams.get('contentid'));
  const contentid = Number(location.pathname.split('/').pop());
  const [updatedDestination, setUpdatedDestination] = useState(destinations);

  useEffect(() => {
    setUpdatedDestination(destinations);
  }, [destinations]);

  async function getDestinationTitle(id: number) {
    try {
      const response = await axios.get(
        `https://vvhooping.com/api/destinations/${contentid}`
      );
      const data = response.data;
      // console.log(data);

      if (data && data.id === id) {
        const title = data.title;
        // console.log('title', title);
        return title;
      }
    } catch (err) {
      console.error('Error: ', err);
      alert('목적지를 선택해 주세요.');
    }
  }

  async function addToSelectedDay() {
    const title = await getDestinationTitle(contentid);

    if (contentid && !updatedDestination.includes(title)) {
      const copiedDestinations = [...updatedDestination];
      copiedDestinations.push(title);
      setUpdatedDestination(copiedDestinations);
      onDestinationUpdate(updatedDestination);

      console.log(contentid);

      try {
        const response = await tokenInstance.post(
          `https://vvhooping.com/api/schedules/${scheduleId}`,
          {
            destinations: destinations
          }
        );
      } catch (err) {
        console.error('Error: ', err);
      }
    }
  }

  return (
    <div className={styles.scheduleDestination}>
      <div className={styles.destinationList}>
        {updatedDestination.map((destination, idx) => (
          <div key={idx}>{destination}</div>
        ))}
        <button onClick={addToSelectedDay}>목적지 추가하기</button>
      </div>
    </div>
  );
}

export default AddToScheduleModal;
