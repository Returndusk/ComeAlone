import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CommonModalDesign.module.scss';
import { AddToScheduleModalType } from '../../../types/ModalScheduleTypes';
import axios from 'axios';
import tokenInstance from '../../../apis/tokenInstance';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function AddToScheduleModal({
  destinations,
  destinationIds,
  selectedDay,
  scheduleId
}: AddToScheduleModalType) {
  const location = useLocation();
  const contentid = Number(location.pathname.split('/').pop());
  const [updatedDestinations, setUpdatedDestinations] = useState([
    ...destinations
  ]);
  const [updatedContentIds, setUpdatedContentIds] = useState([
    ...destinationIds
  ]);

  useEffect(() => {
    setUpdatedDestinations([...destinations]);
    setUpdatedContentIds([...destinationIds]);
  }, [destinations, destinationIds]);

  async function getDestinationTitle(id: number) {
    try {
      const response = await axios.get(`${baseUrl}/destinations/${contentid}`);
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

    if (contentid && !updatedDestinations[selectedDay].includes(title)) {
      const copiedDestinations = [...updatedDestinations];
      // 기존에 목적지가 있거나 없는 경우
      copiedDestinations[selectedDay] = copiedDestinations[selectedDay] || [];
      copiedDestinations[selectedDay].push(title);

      // console.log('updatedDestinations', updatedDestinations);

      const copiedContentIds = [...updatedContentIds];
      copiedContentIds[selectedDay] = copiedContentIds[selectedDay] || [];
      copiedContentIds[selectedDay].push(contentid);

      // console.log('updatedContentIds', updatedContentIds);

      try {
        const response = await tokenInstance.post(
          `${baseUrl}/schedules/${scheduleId}`,
          {
            destinations: updatedContentIds
          }
        );

        console.log(response);

        setUpdatedDestinations(response.data.destinationTitles);
        setUpdatedContentIds(response.data.destinationIds);
      } catch (err) {
        console.error('Error: ', err);
      }
    }
    alert('이미 추가된 일정입니다.');
    return;
  }

  return (
    <div className={styles.scheduleDestination}>
      <div className={styles.destinationList}>
        {updatedDestinations[selectedDay].map((destination, idx) => (
          <div key={idx}>{destination}</div>
        ))}
        <button onClick={addToSelectedDay}>목적지 추가하기</button>
      </div>
    </div>
  );
}

export default AddToScheduleModal;
