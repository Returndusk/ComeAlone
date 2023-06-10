import React, { useState } from 'react';
import styles from './ReviewsSchedule.module.scss';
import { useAuthState } from '../../contexts/AuthContext';
import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { ScheduleReviewPropsType } from '../../types/ScheduleDetailTypes';

function ReviewsSchedule({
  scheduleReviews,
  onReviewDelete
}: ScheduleReviewPropsType) {
  const [isReviewUpdate, setIsReviewUpdate] = useState(false);
  const [targetReviewId, setTargetReviewId] = useState(0);
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
              {isReviewUpdate && targetReviewId === review.comment_id ? (
                <TextField className={styles.reviewUpdateInput} />
              ) : (
                <span>{review.comment}</span>
              )}
              <div className={styles.buttonsContainer}>
                {loggedInUserId === review.user.id ? (
                  <>
                    <button
                      className={styles.updateButton}
                      onClick={() => {
                        setTargetReviewId(review.comment_id);
                        setIsReviewUpdate(true);
                      }}
                    >
                      수정하기
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => {
                        onReviewDelete(review.comment_id);
                      }}
                    >
                      삭제하기
                    </button>
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
