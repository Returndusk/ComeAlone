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
  // schedule,
  // onDestinationUpdate,
  selectedDay,
  scheduleId
}: // 해당 일정 카드의 N일차별 목적지들: string[][]
// updatedDestinations
AddToScheduleModalType) {
  const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const contentid = Number(searchParams.get('contentid'));
  const contentid = Number(location.pathname.split('/').pop());
  const [updatedDestinations, setUpdatedDestinations] = useState([
    ...destinations
  ]);

  // console.log(selectedDay);

  useEffect(() => {
    setUpdatedDestinations([...destinations]);
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

  /**
   * 현재 destinations[][] 은 넘어옴
   * selectedDay 에 따라서 해당 배열에 push함
   * 이후 변경된 내용을 포함해 copy
   */

  async function addToSelectedDay() {
    const title = await getDestinationTitle(contentid);

    console.log(destinations);

    if (contentid && !updatedDestinations.includes(title)) {
      const copiedDestinations = [...updatedDestinations];
      copiedDestinations[selectedDay] = copiedDestinations[selectedDay] || [];
      copiedDestinations[selectedDay].push(title);
      setUpdatedDestinations(copiedDestinations);
      // onDestinationUpdate(updatedDestination);

      console.log(copiedDestinations);
      try {
        // const updatedDestinationsCopy = updatedDestinations.map((selectedDay) =>
        //   selectedDay.map((destination) => {
        //     if (destination === title) {
        //       return contentid;
        //     }
        //     return destination;
        //   })
        // );
        // updatedDestinationsCopy = copiedDestinations;

        const response = await tokenInstance.post(
          `https://vvhooping.com/api/schedules/${scheduleId}`,
          {
            destinations: copiedDestinations
          }
        );
        console.log(copiedDestinations);
      } catch (err) {
        console.error('Error: ', err);
      }
    }
  }

  return (
    <div className={styles.scheduleDestination}>
      <div className={styles.destinationList}>
        {updatedDestinations[selectedDay]?.map((destination, idx) => (
          <div key={idx}>{destination}</div>
        ))}
        <button onClick={addToSelectedDay}>목적지 추가하기</button>
      </div>
    </div>
  );
}

export default AddToScheduleModal;
