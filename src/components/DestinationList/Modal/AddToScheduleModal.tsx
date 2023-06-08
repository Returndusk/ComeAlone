import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CommonModalDesign.module.scss';
import { AddToScheduleModalType } from '../../../types/ModalScheduleTypes';
import axios from 'axios';

/**
 * TODO
 * 1. 추가는 됐지만 N일차로 넘어갔을 때 reset되는 문제
 * 2. POST 요청 => .title이 아니고 .id
 */

function AddToScheduleModal({
  destinations,
  onDestinationUpdate
}: AddToScheduleModalType) {
  const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const contentid = Number(searchParams.get('contentid'));
  const contentid = Number(location.pathname.split('/').pop());

  const [updatedDestination, setUpdatedDestination] = useState(destinations);

  useEffect(() => {
    setUpdatedDestination(destinations);
  }, [destinations]);

  async function addToSelectedDay() {
    // console.log(contentid);
    // if (contentid) {
    //   const contentid = await getDestinationId(contentid);
    if (contentid && !updatedDestination.includes(String(contentid))) {
      const copiedDestinations = [...updatedDestination];
      copiedDestinations.push(String(contentid));
      setUpdatedDestination(copiedDestinations);
      // const updatedDestination = [...updatedDestinations[selectedDay], title];
      // setUpdatedDestinations((prevDestinations) => {
      //   const updated = [...prevDestinations];
      //   updated[selectedDay] = updatedDestination;
      //   return updated;
      // });
      // onDestinationUpdate(copiedDestinations);
      onDestinationUpdate(updatedDestination);
      // }

      // try {
      //   const response = await axios.post("https://vvhooping.com/api/schedules/24", {
      //     destination:
      //   })
      // }
    }
  }
  // console.log(updatedDestination);

  // async function getDestinationId(id: number) {
  //   // const destination = DEFAULT_DESTINATIONS.find(
  //   //   (destination) => Number(destination.contentid) === id
  //   // );
  //   // return destination ? destination.title : '';

  //   try {
  //     const response = await axios.get(
  //       `https://vvhooping.com/api/destinations/${id}`
  //     );
  //     const data = response.data;
  //     // console.log(data);

  //     if (data && data.id === id) {
  //       const contentid = data.id;
  //       console.log('contentid', contentid);
  //       return contentid;
  //     }
  //   } catch (err) {
  //     console.error('Error: ', err);
  //   }
  // }

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
