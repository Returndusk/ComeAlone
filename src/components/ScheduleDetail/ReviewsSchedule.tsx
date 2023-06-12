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
  const [reviewTyping, setReviewTyping] = useState<string>('');
  const [isReviewUpdate, setIsReviewUpdate] = useState<boolean>(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const targetReviewId = useRef<number>(0);
  const loggedInUserId: string = useAuthState().authState.user?.id as string;

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
          const commentId: number = review.comment_id;
          const commenterId: string = review.user.id;
          const comment: string = review.comment;
          const createdAt: string = review.created_at.split('T')[0];
          const profileImagePath: string = review.user.profileImage;

          return (
            <div key={`review ${index}`} className={styles.review}>
              <span className={styles.avatar}>
                {profileImagePath ? (
                  <Avatar
                    sx={{ width: 45, height: 45 }}
                    src={profileImagePath}
                  />
                ) : (
                  <Avatar sx={{ width: 45, height: 45 }}>
                    {review.user.nickname[0]}
                  </Avatar>
                )}
              </span>
              {isReviewUpdate && targetReviewId.current === commentId ? (
                <TextField
                  className={styles.updateInput}
                  value={reviewTyping}
                  onChange={handleChange}
                />
              ) : (
                <span>{comment}</span>
              )}
              {isReviewUpdate ? (
                targetReviewId.current === commentId ? (
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
                ) : loggedInUserId === commenterId ? (
                  <div className={styles.whileUpdateContainer}>
                    <div className={styles.updateOther}>
                      다른 리뷰를 수정 중입니다...
                    </div>
                    <span className={styles.createdAt}>{createdAt}</span>
                  </div>
                ) : (
                  <span className={styles.createdAt}>{createdAt}</span>
                )
              ) : loggedInUserId === commenterId ? (
                <div className={styles.buttonsContainer}>
                  <button
                    className={styles.updateButton}
                    onClick={() => {
                      targetReviewId.current = commentId;
                      setIsReviewUpdate(true);
                      setReviewTyping(review.comment);
                    }}
                  >
                    <FaPen /> 수정
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      targetReviewId.current = commentId;
                      setShowDeleteAlert(true);
                    }}
                  >
                    <FaTrashAlt /> 삭제
                  </button>
                  <span className={styles.createdAt}>{createdAt}</span>
                </div>
              ) : (
                <span className={styles.createdAt}>{createdAt}</span>
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
