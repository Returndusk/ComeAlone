import React, { useCallback, useRef, useState } from 'react';
import styles from './ReviewsSchedule.module.scss';
import { useAuthState } from '../../contexts/AuthContext';
import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { ScheduleReviewPropsType } from '../../types/ScheduleDetailTypes';
import AlertModal from '../common/Alert/AlertModal';

function ReviewsSchedule({
  scheduleReviews,
  onReviewUpdate,
  onReviewDelete
}: ScheduleReviewPropsType) {
  const [reviewTyping, setReviewTyping] = useState('');
  const [isReviewUpdate, setIsReviewUpdate] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const targetReviewId = useRef(0);
  const loggedInUserId = useAuthState().authState.user?.id;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReviewTyping(event.target.value);
    },
    []
  );

  const handleReviewUpdate = () => {
    onReviewUpdate(targetReviewId.current, reviewTyping);
    setIsReviewUpdate(false);
    setShowUpdateAlert(false);
  };

  const handleReviewDelete = () => {
    onReviewDelete(targetReviewId.current);
    setShowDeleteAlert(false);
  };

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
              {isReviewUpdate &&
              targetReviewId.current === review.comment_id ? (
                <TextField
                  className={styles.updateInput}
                  value={reviewTyping}
                  onChange={handleChange}
                />
              ) : (
                <span>{review.comment}</span>
              )}
              {isReviewUpdate ? (
                targetReviewId.current === review.comment_id ? (
                  <div className={styles.updateButtonsContainer}>
                    <button
                      className={styles.updateReviewButton}
                      onClick={() => {
                        setShowUpdateAlert(true);
                      }}
                    >
                      제출
                    </button>
                    <button
                      className={styles.updateReviewCancelButton}
                      onClick={() => setIsReviewUpdate(false)}
                    >
                      취소
                    </button>
                  </div>
                ) : loggedInUserId === review.user.id ? (
                  <div className={styles.whileUpdateContainer}>
                    <div className={styles.updateOther}>
                      다른 리뷰를 수정 중입니다...
                    </div>
                    <span className={styles.createdAt}>
                      {review.created_at.split('T')[0]}
                    </span>
                  </div>
                ) : (
                  <span className={styles.createdAt}>
                    {review.created_at.split('T')[0]}
                  </span>
                )
              ) : loggedInUserId === review.user.id ? (
                <div className={styles.buttonsContainer}>
                  <button
                    className={styles.updateButton}
                    onClick={() => {
                      targetReviewId.current = review.comment_id;
                      setIsReviewUpdate(true);
                      setReviewTyping(review.comment);
                    }}
                  >
                    <FaPen /> 수정
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      targetReviewId.current = review.comment_id;
                      setShowDeleteAlert(true);
                    }}
                  >
                    <FaTrashAlt /> 삭제
                  </button>
                  <span className={styles.createdAt}>
                    {review.created_at.split('T')[0]}
                  </span>
                </div>
              ) : (
                <span className={styles.createdAt}>
                  {review.created_at.split('T')[0]}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {showDeleteAlert && (
        <AlertModal
          message='해당 리뷰를 삭제하시겠습니까?'
          showCancelButton={true}
          onConfirm={handleReviewDelete}
          onCancel={() => setShowDeleteAlert(false)}
        />
      )}
      {showUpdateAlert && (
        <AlertModal
          message='해당 리뷰를 입력하신 내용으로 수정하시겠습니까?'
          showCancelButton={true}
          onConfirm={handleReviewUpdate}
          onCancel={() => setShowUpdateAlert(false)}
        />
      )}
    </div>
  );
}

export default ReviewsSchedule;
