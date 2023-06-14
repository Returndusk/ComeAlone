import React, { useCallback, useRef, useState } from 'react';
import styles from './ReviewsSchedule.module.scss';
import { useAuthState } from '../../contexts/AuthContext';
import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { FaPen, FaTrashAlt, FaCommentAlt } from 'react-icons/fa';
import { CiSquareAlert } from 'react-icons/ci';
import { ScheduleReviewPropsType } from '../../types/ScheduleDetailTypes';
import AlertModal from '../common/Alert/AlertModal';

function stringifyDate(date: string) {
  const onlyDate: string[] = date.split('T')[0].split('-');
  const year = onlyDate[0];
  const month = onlyDate[1];
  const day = onlyDate[2];

  return `${year}년 ${month}월 ${day}일`;
}

function ReviewsSchedule({
  scheduleReviews,
  reviewsCount,
  onReviewUpdate,
  onReviewDelete
}: ScheduleReviewPropsType) {
  const [reviewTyping, setReviewTyping] = useState<string>('');
  const [isReviewUpdate, setIsReviewUpdate] = useState<boolean>(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [showEmptyAlert, setShowEmptyAlert] = useState<boolean>(false);
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
    <>
      <div className={styles.reviewsTitle}>
        <FaCommentAlt className={styles.commentsIcon} />
        리뷰 <div className={styles.commentsCount}>{reviewsCount}</div>
      </div>
      <div className={styles.reviewsContainer}>
        {scheduleReviews.length > 0 ? (
          <div className={styles.reviewsList}>
            {scheduleReviews.map((review, index) => {
              const commentId: number = review.comment_id;
              const commenterId: string = review.user.id;
              const comment: string = review.comment;
              const createdAt: string = review.created_at;
              const profileImagePath: string = review.user.profile_image;

              return (
                <div key={`review ${index}`} className={styles.review}>
                  <div className={styles.commentHeader}>
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
                    <div className={styles.commentSubheader}>
                      <span className={styles.author}>
                        {review.user.nickname}
                      </span>
                      <span className={styles.createdAt}>
                        {stringifyDate(createdAt)}
                      </span>
                    </div>
                    {isReviewUpdate ? (
                      targetReviewId.current === commentId ? (
                        <div>
                          <button
                            className={styles.updateReviewCancelButton}
                            onClick={() => setIsReviewUpdate(false)}
                          >
                            취소
                          </button>
                          <button
                            className={styles.updateReviewButton}
                            onClick={() => {
                              if (!reviewTyping) {
                                setShowEmptyAlert(true);
                              } else {
                                setShowUpdateAlert(true);
                              }
                            }}
                          >
                            저장
                          </button>
                        </div>
                      ) : loggedInUserId === commenterId ? (
                        <div className={styles.updateOther}>
                          다른 리뷰를 수정 중입니다...
                        </div>
                      ) : null
                    ) : loggedInUserId === commenterId ? (
                      <div>
                        <button
                          className={styles.updateButton}
                          onClick={() => {
                            targetReviewId.current = commentId;
                            setIsReviewUpdate(true);
                            setReviewTyping(review.comment);
                          }}
                        >
                          <FaPen />
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => {
                            targetReviewId.current = commentId;
                            setShowDeleteAlert(true);
                          }}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    ) : null}
                  </div>
                  {isReviewUpdate && targetReviewId.current === commentId ? (
                    <TextField
                      className={styles.updateInput}
                      sx={{
                        '& label.Mui-focused': { color: '#ef6d00' },
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#fe9036',
                            borderWidth: '1px'
                          }
                        }
                      }}
                      multiline
                      rows={3}
                      inputProps={{ maxLength: 300 }}
                      value={reviewTyping}
                      onChange={handleChange}
                      label='수정하실 내용을 입력하세요. (최대 300자)'
                    />
                  ) : (
                    <div className={styles.comment}>{comment}</div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.noComments}>
            <CiSquareAlert />
            등록된 리뷰가 없습니다
          </div>
        )}
      </div>
      {showDeleteAlert && (
        <AlertModal
          message='해당 리뷰를 삭제하시겠습니까?'
          showCancelButton={true}
          onConfirm={() => handleReviewDelete()}
          onCancel={() => setShowDeleteAlert(false)}
        />
      )}
      {showUpdateAlert && (
        <AlertModal
          message='해당 리뷰를 입력하신 내용으로 수정하시겠습니까?'
          showCancelButton={true}
          onConfirm={() => handleReviewUpdate()}
          onCancel={() => setShowUpdateAlert(false)}
        />
      )}
      {showEmptyAlert && (
        <AlertModal
          message='수정하실 리뷰 내용을 입력해주세요.'
          onConfirm={() => setShowEmptyAlert(false)}
        />
      )}
    </>
  );
}

export default ReviewsSchedule;
