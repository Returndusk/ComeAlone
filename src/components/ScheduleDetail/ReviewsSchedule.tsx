import React from 'react';
import styles from './ReviewsSchedule.module.scss';
import Avatar from '@mui/material/Avatar';
import { ScheduleReviewPropsType } from '../../types/ScheduleDetailTypes';

function ReviewsSchedule({
  scheduleReviews
}: {
  scheduleReviews: ScheduleReviewPropsType[];
}) {
  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsTitle}>리뷰 리스트</div>
      <div className={styles.reviewsList}>
        {scheduleReviews.map((review, index) => {
          console.log(review);

          return (
            <div key={`review ${index}`} className={styles.review}>
              <span className={styles.nickname}>
                <Avatar>{review.user.nickname[0]}</Avatar>
              </span>
              <span>{review.comment}</span>
              <span className={styles.createdAt}>
                {review.created_at.split('T')[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReviewsSchedule;
