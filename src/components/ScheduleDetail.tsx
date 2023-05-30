import React from 'react';

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
    </>
  );
}

function ScheduleReviewsComponent() {
  return (
    <>
      {reviews.map((review, index) => {
        return (
          <div key={index} className='review'>
            <span className='review-writer'>{review.writer}</span>
            <span className='review-comment'>{review.comment}</span>
          </div>
        );
      })}
    </>
  );
}

export { DestinationListComponent, ScheduleReviewsComponent };
