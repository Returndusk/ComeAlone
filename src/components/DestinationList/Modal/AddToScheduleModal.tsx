import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModalScheduleLists from './ModalScheduleLists';
import ModalScheduleCard from './ModalScheduleCard';
import styles from './CommonModalDesign.module.scss';

/**
 * 현재 /destination/list 가 default
 * 이걸 차라리 최초 목적지 페이지 렌더링 시 /destination/list/:제주도시청id?
 */

const DEFAULT_DESTINATIONS = [
  {
    title: '제주도 시청',
    mapy: 33.48907969999994,
    mapx: 126.49932809999973,
    id: '32'
  },
  {
    title: '한라산',
    mapy: 33.37915262371278,
    mapx: 126.54626368383182,
    tel: '064-772-3366',
    overview: '개요 설명입니다.',
    id: '12'
  },
  {
    title: '서귀포 해양 도립공원',
    mapy: 33.241570451808215,
    mapx: 126.55770550692283,
    id: '25'
  },
  {
    title: '금오름',
    mapy: 33.35452764241429,
    mapx: 126.30590904987518,
    id: '12'
  }
];

/**
 * @param id /destination/list/:id
 * @returns 현재 URL에서 id따와서 title 반환해서 해당 N일차에 추가
 */

function AddToScheduleModal() {
  return <></>;
}

export default AddToScheduleModal;
