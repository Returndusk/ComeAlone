import React from 'react';
import Avatar from '@mui/material/Avatar';

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

export default ScheduleReviewsComponent;
