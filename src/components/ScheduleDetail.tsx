import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';

function DestinationListComponent({
  destinations,
  onChecked
}: {
  destinations: string[][];
  onChecked: any;
}) {
  const [checkedDayIndex, setCheckedDayIndex] = useState(-1);

  return (
    <>
      <div className='destinations-title'>목적지 리스트</div>
      <label>
        <input
          type='checkbox'
          checked={checkedDayIndex === -1}
          onChange={() => {
            setCheckedDayIndex(-1);
            onChecked(destinations.flat());
          }}
        />
        전체 목적지 보기
      </label>
      <div className='destinations-list'>
        {destinations.map((destOfDay, index) => {
          return (
            <ol
              key={index}
              className='destinations-day'
              id={'day' + (index + 1).toString()}
            >
              <label>
                <input
                  type='checkbox'
                  checked={checkedDayIndex === index}
                  onChange={() => {
                    if (checkedDayIndex === index) {
                      setCheckedDayIndex(-1);
                      onChecked(destinations.flat());
                    } else {
                      setCheckedDayIndex(index);
                      onChecked(destOfDay);
                    }
                  }}
                />{' '}
                Day {index + 1}
              </label>
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
              <span className='review-writer'>
                <Avatar>{review.writer}</Avatar>
              </span>
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
    <>
      <Avatar className='reviews-input-writer'>B</Avatar>
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
    </>
  );
}

export {
  DestinationListComponent,
  ScheduleReviewsComponent,
  ScheduleReviewInputComponent
};
