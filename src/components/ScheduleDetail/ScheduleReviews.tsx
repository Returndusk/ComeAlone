import React from 'react';
import styles from './ScheduleDetail.module.scss';
import Avatar from '@mui/material/Avatar';

function ScheduleReviewsComponent({
  reviews
}: {
  reviews: { writer: string; comment: string }[];
}) {
  return (
    <div className={styles.reviewsWrapper}>
      <div className={styles.reviewsTitle}>리뷰 리스트</div>
      <div className={styles.reviewsList}>
        {reviews.map((review, index) => {
          return (
            <div key={index} className={styles.review}>
              <span className={styles.reviewWriter}>
                <Avatar>{review.writer}</Avatar>
              </span>
              <span>{review.comment}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScheduleReviewsComponent;
