import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Review.module.scss';
import {
  DestinationsReviewType,
  commentType
} from '../../types/DestinationListTypes';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getReviewByDestinationId,
  postReviewByDestinationId
} from '../../apis/destinationList';
import UsersReview from './UsersReview';

const ALERT_PROPS = {
  message: '로그인이 필요한 기능입니다.',
  showTitle: false
};

const SUCCESS_ALERT_PROPS = {
  successMessage: '리뷰 등록에 성공했습니다.',
  failedMessage: '리뷰 등록에 실패했습니다. 다시 등록해주세요',
  showTitle: false
};

function Review() {
  const [submittedReview, setSubmittedReview] = useState<commentType>({
    comment: null
  });
  const [allReviewList, setAllReviewList] = useState<
    DestinationsReviewType[] | null
  >(null);
  const [isAccessUsersReview, setIsAccessUsersReview] =
    useState<boolean>(false);
  const { authState, updateAuthState } = useAuthState();
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [isShowSuccessAlert, setIsShowSuccessAlert] = useState<boolean | null>(
    null
  );
  const { contentid } = useParams();
  const navigate = useNavigate();
  //리뷰 등록 -> 요청 -> 리뷰 목록 상태 리렌더링

  //리뷰 조회 메서드
  const getReviewList = useCallback(async () => {
    const res = await getReviewByDestinationId(Number(contentid));
    const reviewList = res?.data;
    setAllReviewList(() => reviewList);
  }, [contentid]);

  useEffect(() => {
    getReviewList();
  }, [getReviewList]);

  //리뷰 등록 메서드
  const addReview = async () => {
    const res = await postReviewByDestinationId(
      Number(contentid),
      submittedReview
    );
    const status = res?.status;
    if (status === 201) {
      setIsShowSuccessAlert(true);
      getReviewList();
      return;
    }
    setIsShowSuccessAlert(false);
  };

  //리뷰 수
  const reviewCount = useMemo(() => {
    return allReviewList?.length;
  }, [allReviewList]);

  const isNullishReviewInput = (input: string) => {
    return input === '' || input.length <= 5;
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
      alert('내용을 5자 이상 입력해주세요.');
    }

    setSubmittedReview(() => {
      return { comment: userReview };
    });
    e.target.review.value = null;
  };

  useEffect(() => {
    if (submittedReview.comment !== null) {
      addReview();
      return;
    }
  }, [submittedReview]);

  //사용자 리뷰 목록 조회 시도
  const handleUsersReviewClick = () => {
    if (authState.isLoggedIn) {
      setIsAccessUsersReview(true);
      return;
    }
    setIsShowAlert(true);
  };

  const handleOnLoginConfirm = () => {
    setIsShowAlert(false);
    navigate('/login');
  };

  const handleOnReviewConfirm = () => {
    setIsShowSuccessAlert(null);
  };

  /*
   * 리뷰 객체
  id: number;
  commenter_id: string;
  comment: string;
  created_at: string; */

  return (
    <div>
      <div className={styles.reviewContainer}>
        <div>{`한 줄 리뷰(${reviewCount})`}</div>
        <ul>
          {allReviewList?.map((review, index) => {
            return (
              <div key={index}>
                <p>{review.commenter_id}</p>
                <p>{review.comment}</p>
                <p>{review.created_at}</p>
              </div>
            );
          })}
        </ul>
        <form className={styles.reviewBar} onSubmit={handleReviewSubmit}>
          <input
            id={styles.reviewBar}
            type='text'
            name='review'
            placeholder={
              authState.isLoggedIn
                ? '리뷰를 작성해주세요.'
                : '로그인이 필요합니다.'
            }
          />
          <button id={styles.reviewButton} type='submit'>
            등록
          </button>
        </form>
        <button
          id={styles.usersReviewListButton}
          onClick={handleUsersReviewClick}
        >
          내 리뷰 목록
        </button>
      </div>
      {isAccessUsersReview && <UsersReview />}
      {isShowAlert && (
        <AlertModal
          message={ALERT_PROPS.message}
          onConfirm={handleOnLoginConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
      {isShowSuccessAlert && (
        <AlertModal
          message={SUCCESS_ALERT_PROPS.successMessage}
          onConfirm={handleOnReviewConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
      {isShowSuccessAlert === false && (
        <AlertModal
          message={SUCCESS_ALERT_PROPS.failedMessage}
          onConfirm={handleOnReviewConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
    </div>
  );
}

export default Review;
