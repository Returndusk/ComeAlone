import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalScheduleLists from './ModalScheduleLists';
import ModalScheduleCard from './ModalScheduleCard';
import DestinationDetails from '../DestinationDetails';
import styles from './CommonModalDesign.module.scss';
import dummy from '../../ScheduleList/ScheduleListDummy';

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

/**
 * 현재 params(id)와 contentid가 일치하는지 확인(반복문?)
 * 일치하면 해당 contentid를 가진 data의 title 반환
 * 기존 일정 배열에 push
 */
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
function AddToScheduleModal() {
  const { contentid } = useParams();
  const [selectedDay, setSelectedDay] = useState(1);

  function addToSchedule() {
    const title = getDestinationTitle(Number(contentid));
    console.log(selectedDay);

    if (title) {
      const updatedDestinations = [...dummy];
      const destinationIdx = selectedDay - 1;
      // updatedDestinations[destinationIdx].destinations.push(title);
      console.log(updatedDestinations[destinationIdx].destinations);
    }
  }

  return (
    <>
      <button onClick={addToSchedule}>스케쥴 추가하기</button>
    </>
  );
}

export default AddToScheduleModal;
