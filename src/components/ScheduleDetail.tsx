import React, { useState } from 'react';

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

function DestinationListComponent() {
  return (
    <>
      <div className='destinations-title'>목적지 리스트</div>
      <div className='destinations-list'>
        {destinations.map((destOfDay, index) => {
          return (
            <ol className='destinations-day' key={index}>
              Day {index + 1}
              {destOfDay.map((dest, index) => (
                <li key={index}>{dest}</li>
              ))}
            </ol>
          );
        })}
      </div>
    </>
  );
}

function ScheduleReviewsComponent() {
  return (
    <>
      <div className='reviews-title'>리뷰 리스트</div>
      <div className='reviews-list'>
        {reviews.map((review, index) => {
          return (
            <div key={index} className='review'>
              <span className='review-writer'>{review.writer}</span>
              <span className='review-comment'>{review.comment}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

function ScheduleReviewInputComponent({ onSubmit }: { onSubmit: any }) {
  const [reviewTyping, setReviewTyping] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewTyping(event.target.value);
  };

  return (
    <div>
      <span className='reviews-input-writer'>사용자</span>
      <textarea
        className='reviews-input-text'
        onChange={handleChange}
      ></textarea>
      <button
        className='reviews-input-button'
        onClick={() => {
          onSubmit(reviewTyping);
        }}
      >
        제출
      </button>
    </div>
  );
}

export {
  DestinationListComponent,
  ScheduleReviewsComponent,
  ScheduleReviewInputComponent
};
