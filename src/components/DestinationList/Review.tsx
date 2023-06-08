import React, { useEffect, useMemo, useState } from 'react';
import styles from './Review.module.scss';
import { DestinationsDetailsType } from '../../types/DestinationListTypes';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';
import { useNavigate } from 'react-router-dom';

type ReviewPropsType = {
  destinationDetails: DestinationsDetailsType | null;
};

const ALERT_PROPS = {
  message: '로그인이 필요한 기능입니다.',
  showTitle: false
};

function Review({ destinationDetails }: ReviewPropsType) {
  const [submittedReview, setSubmittedReview] = useState<string>('');
  const { authState, updateAuthState } = useAuthState();
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const reviewList = useMemo(() => {
    return destinationDetails?.destination_comments;
  }, [destinationDetails]);

  const reviewCount = useMemo(() => {
    return destinationDetails?.comment_count;
  }, [destinationDetails]);

  const handleReviewSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userReview = e.target.review.value;
    setSubmittedReview(() => userReview);
    return;
  };

  useEffect(() => {
    /*Post 요청*/
    /*Get 요청*/
  }, [submittedReview]);

  const handleCommentInputClick = () => {
    if (authState.isLoggedIn) {
      postLikesDestinations();
    } else {
      setIsOpenAlert(true);
    }
  };

  const handleOnConfirm = () => {
    setIsOpenAlert(false);
    navigate('/login');
  };

  return (
    <div>
      <div className={styles.reviewContainer}>
        <div>{`한 줄 리뷰(${reviewCount})`}</div>
        <ul>
          {reviewList?.map((review, index) => {
            return <li key={index}>{review}</li>;
          })}
        </ul>
        <form
          className={styles.reviewBar}
          onSubmit={handleReviewSubmit}
          onClick={handleCommentInputClick}
        >
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
      </div>
      {isOpenAlert && (
        <AlertModal
          message={ALERT_PROPS.message}
          onConfirm={handleOnConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
    </div>
  );
}

export default Review;
