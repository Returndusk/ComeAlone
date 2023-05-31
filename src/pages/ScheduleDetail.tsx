import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/ScheduleDetail/ScheduleDetail.module.scss';
import { FaHeart, FaCommentAlt } from 'react-icons/fa';

import {
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
          <img
            className={styles.image}
            src='https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80'
            alt='representative-image'
          />
        </div>
        <div className={styles.duration}>4일 일정</div>
        <div className={styles['edit-button-wrapper']}>
          <Link to='/schedule/edit' className={styles['edit-button']}>
            수정하기
          </Link>
        </div>
        <h1 className={styles.title}>혼자 떠나는 우도 여행</h1>
        <div className={styles['icons-wrapper']}>
          <span id={styles.likes}>
            <FaHeart id={styles['likes-icon']} />7
          </span>
          <span id={styles['review-number']}>
            <FaCommentAlt id={styles['review-number-icon']} />5
          </span>
        </div>
        <h3 className={styles.writer}>제주123</h3>
        <h4 className={styles.date}>2023.04.01.</h4>
        <div className={styles['description-wrapper']}>
          <p>혼자 떠나는 우도 여행 일정입니다.</p>
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
