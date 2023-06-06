import React, { useEffect, useState } from 'react';
import styles from './Review.module.scss';

const REVIEWS_DUMMY_DATA = [
  '여기 재밌었어요.',
  '사람이 엄청 많아요',
  '또 가고 싶어요~'
];

function Review() {
  const [submittedReview, setSubmittedReview] = useState<string>('');

  const handleReviewSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userReview = e.target.review.value;
    setSubmittedReview(() => userReview);
    return;
  };

  useEffect(() => {
    /*Post 요청*/
    /*Get 요청*/
    REVIEWS_DUMMY_DATA.push(submittedReview);
  }, [submittedReview]);

  return (
    <div>
      <div className={styles.reviewContainer}>
        <ul>
          {REVIEWS_DUMMY_DATA.map((review, index) => {
            return <li key={index}>{review}</li>;
          })}
        </ul>
        <form className={styles.reviewBar} onSubmit={handleReviewSubmit}>
          <input
            id={styles.reviewBar}
            type='text'
            name='review'
            placeholder='리뷰를 작성해주세요.'
          />
          <button id={styles.reviewButton} type='submit'>
            등록
          </button>
        </form>
      </div>
    </div>
  );
}

export default Review;
