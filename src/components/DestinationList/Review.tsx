import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Review.module.scss';
import {
  DestinationsReviewType,
  commentType
} from '../../types/DestinationListTypes';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  getReviewByDestinationId,
  postReviewByDestinationId
} from '../../apis/destinationListAPI';
import { Avatar, TextField } from '@mui/material';
import ReviewManagement from './ReviewManagement';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

const ALERT_PROPS = {
  message: '로그인이 필요한 기능입니다.',
  NulllishCommentMessage: '내용을 입력해주세요.',
  showTitle: false
};

const RESPONSE_STATUS = {
  POST_SUCCESS: 201
};

const REVIEW_HANDLER = {
  MAXIMUM_WORDS: 300
};

function Review() {
  const [submittedReview, setSubmittedReview] = useState<commentType>({
    comment: null
  });
  const [allReviewList, setAllReviewList] = useState<
    DestinationsReviewType[] | null
  >(null);

  const { authState } = useAuthState();
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [isShowNullishAlert, setIsShowNullishAlert] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [targetComment, setTargetComment] = useState<number | null>(null);
  const { contentid } = useParams();
  const navigate = useNavigate();
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);
  const url = useLocation().pathname;

  //리뷰 조회 메서드
  const getReviewList = useCallback(async () => {
    const res = await getReviewByDestinationId(Number(contentid));
    const reviewList = res?.data;
    setAllReviewList(() => reviewList);
  }, [contentid, setAllReviewList]);

  useEffect(() => {
    getReviewList();
  }, [getReviewList]);

  //리뷰 등록일자 가공 매서드
  const changeCreatedAtIntoDate = (date: string) => {
    const reviewDate = new Date(date);
    const year = reviewDate.getFullYear();
    const month = reviewDate.getMonth() + 1;
    const day = reviewDate.getDate();
    const hour = reviewDate.getHours().toString().padStart(2, '0');
    const minute = reviewDate.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hour}:${minute}`;
  };

  //리뷰 등록 메서드
  const addReview = useCallback(
    async (contentid: number) => {
      const res = await postReviewByDestinationId(contentid, submittedReview);
      const status = res?.status;
      if (status === RESPONSE_STATUS.POST_SUCCESS) {
        await getReviewList();
      }
      return;
    },
    [contentid, getReviewList, submittedReview]
  );

  //리뷰 수
  const reviewCount = useMemo(() => {
    return allReviewList?.length;
  }, [allReviewList]);

  const isNullishReviewInput = (input: string) => {
    return input === '';
  };

  //리뷰 등록 시도
  const handleReviewSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    const userReview = e.target.review.value;
    if (isNullishReviewInput(userReview)) {
      setIsShowNullishAlert(true);
      return;
    }

    setSubmittedReview(() => {
      return { comment: userReview };
    });
    e.target.review.value = null;
    return;
  };

  useEffect(() => {
    if (submittedReview.comment !== null) {
      addReview(Number(contentid));
      setSubmittedReview(() => {
        return { comment: null };
      });
    }
  }, [submittedReview.comment, setSubmittedReview, addReview]);

  //유저의 댓글인지 확인하는 매서드
  const isUserReviewer = useCallback(
    (review: DestinationsReviewType) => {
      if (review?.user?.id) {
        return review?.user?.id === authState.user?.id;
      }
    },
    [authState]
  );

  //리뷰를 수정할 때, 유저의 기존 리뷰만 보이지 않게 하는 함수
  const checkToShowUsersReview = (review: DestinationsReviewType) => {
    return !isEditing || review.comment_id !== targetComment;
  };

  // 수정 버튼 클릭 이벤트 (수정 시작)
  const handleModifiedButtonOnClick = (commentid: number) => {
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    setIsEditing(() => true);
    setTargetComment(() => commentid);
    return;
  };

  const handleDeleteOnClick = () => {
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    setIsConfirmDelete(() => true);
  };

  const handleOnNullishCommentConfirm = () => {
    setIsShowNullishAlert(false);
    return;
  };

  const handleOnLoginConfirm = () => {
    setIsShowAlert(false);
    navigate('/login', { state: { prevUrl: url } });
    return;
  };

  return (
    <>
      <section className={styles.reviewWrapper}>
        <h3 className={styles.reviewBanner}>
          {reviewCount !== undefined && `리뷰(${reviewCount})`}
        </h3>
        <div className={styles.reviewContainer}>
          {allReviewList?.map((review, index) => {
            return (
              <div key={index} className={styles.reviewBox}>
                <div className={styles.reviewUserInfo}>
                  <Avatar
                    className={styles.reviewerAvatar}
                    src={review.user.profile_image}
                  >
                    {review.user.nickname[0]}
                  </Avatar>
                  <div className={styles.reviewInfo}>
                    <div className={styles.reviewerInfo}>
                      <span className={styles.reviewerNickname}>
                        {review.user.nickname}
                      </span>
                    </div>

                    <div className={styles.reviewDate}>
                      <span id={styles.reviewCreatedDate}>
                        {changeCreatedAtIntoDate(review.created_at)}
                      </span>
                      {review.created_at !== review.updated_at && (
                        <span className={styles.reviewModifiedDate}>
                          수정됨
                        </span>
                      )}
                    </div>
                  </div>
                  {!isEditing && isUserReviewer(review) && (
                    <span className={styles.reviewHandlebox}>
                      <div className={styles.reviewHandleButtonContainer}>
                        <button
                          className={styles.modifyButton}
                          onClick={() =>
                            handleModifiedButtonOnClick(review.comment_id)
                          }
                        >
                          <FaPen />
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={handleDeleteOnClick}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </span>
                  )}
                </div>
                {isUserReviewer(review) && (
                  <ReviewManagement
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    getReviewList={getReviewList}
                    targetComment={targetComment}
                    setTargetComment={setTargetComment}
                    commentid={review?.comment_id}
                    isConfirmDelete={isConfirmDelete}
                    setIsConfirmDelete={setIsConfirmDelete}
                    prevComment={review.comment}
                  />
                )}
                {checkToShowUsersReview(review) && (
                  <p className={styles.reviewComment}>{review.comment}</p>
                )}
              </div>
            );
          })}
        </div>
        {!isEditing && (
          <div className={styles.reviewInputContainer}>
            <Avatar
              className={styles.reviewInputAvatar}
              src={authState?.user?.profile_image}
            >
              {authState.user?.nickname[0] ?? 'G'}
            </Avatar>
            <form
              className={styles.reviewInputForm}
              onSubmit={handleReviewSubmit}
            >
              <TextField
                className={styles.reviewInputBar}
                type='text'
                name='review'
                inputProps={{ maxLength: REVIEW_HANDLER.MAXIMUM_WORDS }}
                size='small'
                label={
                  authState.isLoggedIn
                    ? '리뷰를 작성해주세요.'
                    : '로그인이 필요합니다.'
                }
                sx={{
                  '& label.Mui-focused': { color: '#ef6d00' },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#fe9036',
                      borderWidth: '1px'
                    }
                  }
                }}
              />
              <button className={styles.reviewButton} type='submit'>
                등록
              </button>
            </form>
          </div>
        )}
      </section>
      {isShowAlert && (
        <AlertModal
          message={ALERT_PROPS.message}
          onConfirm={handleOnLoginConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
      {isShowNullishAlert && (
        <AlertModal
          message={ALERT_PROPS.NulllishCommentMessage}
          onConfirm={handleOnNullishCommentConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
    </>
  );
}

export default Review;
