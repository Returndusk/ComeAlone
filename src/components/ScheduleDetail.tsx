import React, { useState } from 'react';

function DestinationListComponent({
  destinations
}: {
  destinations: string[][];
}) {
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

function ScheduleReviewsComponent({
  reviews
}: {
  reviews: { writer: string; comment: string }[];
}) {
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
