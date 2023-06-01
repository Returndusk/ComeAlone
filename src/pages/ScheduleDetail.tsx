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

type Schedule = {
  createdBy: string;
  title: string;
  summary: string;
  duration: string;
  startDate: string;
  endDate: string;
  image: string;
  createdAt: string;
};

const schedule: Schedule = {
  createdBy: '제주123',
  title: '혼자 떠나는 우도 여행',
  summary: '혼자 떠나는 우도 여행 일정입니다.',
  duration: '3',
  startDate: '2023.06.01.',
  endDate: '2023.06.03.',
  image:
    'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80',
  createdAt: '2023.04.01.'
};

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

const likesAmount = 7;

const reviewsAmount = 5;

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
          <ScheduleDetailImageComponent image={schedule.image} />
        </div>
        <div className={styles['schedule-info-wrapper']}>
          <ScheduleDetailInfoComponent
            duration={schedule.duration}
            title={schedule.title}
            writer={schedule.createdBy}
            startDate={schedule.startDate}
            endDate={schedule.endDate}
            date={schedule.createdAt}
            description={schedule.summary}
          />
        </div>
        <div className={styles['edit-button-wrapper']}>
          <Link to='/schedule/edit' className={styles['edit-button']}>
            수정하기
          </Link>
        </div>
        <div className={styles['icons-wrapper']}>
          <ScheduleDetailIconsComponent
            likesAmount={likesAmount}
            reviewsAmount={reviewsAmount}
          />
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
