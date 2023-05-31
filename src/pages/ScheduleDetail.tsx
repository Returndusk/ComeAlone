import React, { useState } from 'react';
import '../components/ScheduleDetail.scss';
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
    writer: '아무개',
    comment: '좋은 일정입니다.'
  },
  {
    writer: '아무개',
    comment: '우도 잘 다녀왔습니다.'
  },
  {
    writer: '아무개',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: '아무개',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: '아무개',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: '아무개',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: '아무개',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: '아무개',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: '아무개',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.'
  },
  {
    writer: '아무개',
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
      <div className='container'>
        <div className='image-wrapper'>
          <img
            className='image'
            src='https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80'
            alt='representative-image'
          />
        </div>
        <div className='duration'>3박 4일</div>
        <div className='edit-button-wrapper'>
          <button className='edit-button'>수정하기</button>
        </div>
        <h1 className='title'>혼자 떠나는 우도 여행</h1>
        <div className='icons-wrapper'>
          <span id='likes'>
            <FaHeart id='likes-icon' />7
          </span>
          <span id='review-number'>
            <FaCommentAlt id='review-number-icon' />5
          </span>
        </div>
        <h3 className='writer'>제주123</h3>
        <h4 className='date'>2023.04.01.</h4>
        <div className='description-wrapper'>
          <p>혼자 떠나는 우도 여행 일정입니다.</p>
        </div>
        <div className='destinations-wrapper'>
          <DestinationListComponent
            destinations={destinations}
            onChecked={onDestinationsChecked}
          />
        </div>
        <div className='map'>
          {checkedDestinations.map((dest, index) => (
            <div key={index}>{dest}</div>
          ))}
        </div>
        <div className='reviews-wrapper'>
          <ScheduleReviewsComponent reviews={reviews} />
        </div>
        <div className='review-input-wrapper'>
          <ScheduleReviewInputComponent onSubmit={onReviewSubmit} />
          {reviewInput}
        </div>
      </div>
    </>
  );
}

export default ScheduleDetail;
