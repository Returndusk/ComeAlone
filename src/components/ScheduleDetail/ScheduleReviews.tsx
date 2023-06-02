import React from 'react';
import styles from './ScheduleDetail.module.scss';
import Avatar from '@mui/material/Avatar';

function ScheduleReviewsComponent({
  reviews
}: {
  reviews: { writer: string; comment: string }[];
}) {
  return (
    <div className={styles['reviews-wrapper']}>
      <div className={styles['reviews-title']}>리뷰 리스트</div>
      <div className={styles['reviews-list']}>
        {reviews.map((review, index) => {
          return (
            <div key={index} className={styles.review}>
              <span className={styles['review-writer']}>
                <Avatar>{review.writer}</Avatar>
              </span>
              <span className={styles['review-comment']}>{review.comment}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScheduleReviewsComponent;
