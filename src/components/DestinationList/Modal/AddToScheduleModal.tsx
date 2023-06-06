import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CommonModalDesign.module.scss';
import { AddToScheduleModalType } from '../../../types/ModalScheduleTypes';

/**
 * TODO
 * 1. 추가는 됐지만 N일차로 넘어갔을 때 reset되는 문제
 * 2. 추가한 목적지라면 더 이상 추가 안 되도록
 */

const DEFAULT_DESTINATIONS = [
  {
    title: '제주도 시청',
    mapy: 33.48907969999994,
    mapx: 126.49932809999973,
    tel: '064-772-3366',
    overview: '개요 설명입니다.',
    contenttypeid: '32',
    contentid: '0'
  },
  {
    title: '한라산',
    mapy: 33.37915262371278,
    mapx: 126.54626368383182,
    tel: '064-772-3366',
    overview: '개요 설명입니다.',
    contenttypeid: '12',
    contentid: '1'
  },
  {
    title: '서귀포 해양 도립공원',
    mapy: 33.241570451808215,
    mapx: 126.55770550692283,
    tel: '064-772-3366',
    overview: '개요 설명입니다.',
    contenttypeid: '25',
    contentid: '2'
  },
  {
    title: '금오름',
    mapy: 33.35452764241429,
    mapx: 126.30590904987518,
    tel: '064-772-3366',
    overview: '개요 설명입니다.',
    contenttypeid: '12',
    contentid: '3'
  }
];

function getDestinationTitle(id: number) {
  const destination = DEFAULT_DESTINATIONS.find(
    (destination) => Number(destination.contentid) === id
  );
  return destination ? destination.title : '';
}

/**
 * @param id /destination/list/:id
 * @returns 현재 URL에서 id따와서 title 반환해서 해당 N일차에 추가
 */
function AddToScheduleModal({
  destinations
}: // onDestinationUpdate
AddToScheduleModalType) {
  const { contentid } = useParams();
  const [updatedDestination, setUpdatedDestination] = useState(destinations);

  useEffect(() => {
    setUpdatedDestination(destinations);
  }, [destinations]);

  function addToSelectedDay() {
    const title = getDestinationTitle(Number(contentid));

    if (title) {
      const copiedDestinations = [...updatedDestination];
      copiedDestinations.push(title);
      setUpdatedDestination(copiedDestinations);
      // onDestinationUpdate(copiedDestinations);
    }
  }
  // console.log(updatedDestination);

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
