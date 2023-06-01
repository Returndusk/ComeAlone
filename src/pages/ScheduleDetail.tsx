import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/ScheduleDetail/ScheduleDetail.module.scss';

import {
  ScheduleDetailImageComponent,
  ScheduleDetailInfoComponent,
  ScheduleDetailIconsComponent,
  DestinationListComponent,
  ScheduleReviewsComponent,
  ScheduleReviewInputComponent
} from '../components/ScheduleDetail';

const destinations = [
  ['제주국제공항', '협재포구', '북촌 돌하르방공원'],
  ['두문포항', '우도', '지미봉'],
  ['월정리 해수욕장', '김녕항', '세화해변', '제주국제공항'],
  ['제주국제공항', '제주국제공항', '제주국제공항']
];

const reviews = [
  {
    writer: 'A',
    comment: '좋은 일정입니다.'
  },
  {
    writer: 'A',
    comment: '우도 잘 다녀왔습니다.'
  },
  {
    writer: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  }
];

function ScheduleDetail() {
  const [reviewInput, setReviewInput] = useState('');
  const [checkedDestinations, setCheckedDestinations] = useState(
    destinations.flat()
  );

  const onDestinationsChecked = (destinations: string[]) => {
    setCheckedDestinations(destinations);
  };

  const onReviewSubmit = (input: string) => {
    setReviewInput(input);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles['image-wrapper']}>
          <ScheduleDetailImageComponent />
        </div>
        <div className={styles['schedule-info-wrapper']}>
          <ScheduleDetailInfoComponent />
        </div>
        <div className={styles['edit-button-wrapper']}>
          <Link to='/schedule/edit' className={styles['edit-button']}>
            수정하기
          </Link>
        </div>
        <div className={styles['icons-wrapper']}>
          <ScheduleDetailIconsComponent />
        </div>
        <div className={styles['destinations-wrapper']}>
          <DestinationListComponent
            destinations={destinations}
            onChecked={onDestinationsChecked}
          />
        </div>
        <div className={styles.map}>
          {checkedDestinations.map((dest, index) => (
            <div key={index}>{dest}</div>
          ))}
        </div>
        <div className={styles['reviews-wrapper']}>
          <ScheduleReviewsComponent reviews={reviews} />
        </div>
        <div className={styles['review-input-wrapper']}>
          <ScheduleReviewInputComponent onSubmit={onReviewSubmit} />
          {reviewInput}
        </div>
      </div>
    </>
  );
}

export default ScheduleDetail;
