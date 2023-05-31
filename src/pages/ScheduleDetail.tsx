import React, { useState } from 'react';
import '../components/ScheduleDetail.scss';
import { FaHeart, FaCommentAlt } from 'react-icons/fa';

import {
  DestinationListComponent,
  ScheduleReviewsComponent,
  ScheduleReviewInputComponent
} from '../components/ScheduleDetail';

function ScheduleDetail() {
  const [reviewInput, setReviewInput] = useState('');

  const onSubmit = (input: string) => {
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
            <FaCommentAlt id='review-number-icon' />3
          </span>
        </div>
        <h3 className='writer'>제주123</h3>
        <h4 className='date'>2023.04.01.</h4>
        <div className='description-wrapper'>
          <p>혼자 떠나는 우도 여행 일정입니다.</p>
        </div>
        <div className='destinations-wrapper'>
          <div className='destinations-title'>목적지 리스트</div>
          <div className='destinations-list'>
            <DestinationListComponent />
          </div>
        </div>
        <div className='map'>지도</div>
        <div className='reviews-wrapper'>
          <ScheduleReviewsComponent />
        </div>
        <div className='review-input-wrapper'>
          <ScheduleReviewInputComponent onSubmit={onSubmit} />
          {reviewInput}
        </div>
      </div>
    </>
  );
}

export default ScheduleDetail;
