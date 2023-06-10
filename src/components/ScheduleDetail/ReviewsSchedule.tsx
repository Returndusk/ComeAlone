import React from 'react';
import styles from './ReviewsSchedule.module.scss';
import { useAuthState } from '../../contexts/AuthContext';
import Avatar from '@mui/material/Avatar';
import { ScheduleReviewPropsType } from '../../types/ScheduleDetailTypes';

function ReviewsSchedule({
  scheduleReviews
}: {
  scheduleReviews: ScheduleReviewPropsType[];
}) {
  const loggedInUserId = useAuthState().authState.user?.id;

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsTitle}>리뷰 리스트</div>
      <div className={styles.reviewsList}>
        {scheduleReviews.map((review, index) => {
          return (
            <div key={`review ${index}`} className={styles.review}>
              <span className={styles.nickname}>
                <Avatar>{review.user.nickname[0]}</Avatar>
              </span>
              <span>{review.comment}</span>
              <div className={styles.buttonsContainer}>
                {loggedInUserId === review.user.id ? (
                  <>
                    <button className={styles.updateButton}>수정하기</button>
                    <button className={styles.deleteButton}>삭제하기</button>
                  </>
                ) : null}
                <span className={styles.createdAt}>
                  {review.created_at.split('T')[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReviewsSchedule;
