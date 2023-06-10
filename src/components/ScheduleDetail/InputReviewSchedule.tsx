import React, { useState } from 'react';
import { useAuthState } from '../../contexts/AuthContext';
import styles from './InputReviewSchedule.module.scss';
import Avatar from '@mui/material/Avatar';

function InputReviewSchedule({
  onReviewSubmit
}: {
  onReviewSubmit: (input: string) => void;
}) {
  const [reviewTyping, setReviewTyping] = useState('');
  const { authState } = useAuthState();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewTyping(event.target.value);
  };

  return (
    <>
      {authState.isLoggedIn ? (
        <div className={styles.reviewInputContainer}>
          <Avatar>{authState.user?.nickname[0]}</Avatar>
          <textarea
            className={styles.reviewsInputText}
            onChange={handleChange}
            value={reviewTyping}
          ></textarea>
          <button
            className={styles.reviewsInputButton}
            onClick={() => {
              onReviewSubmit(reviewTyping);
              setReviewTyping('');
            }}
          >
            제출
          </button>
        </div>
      ) : (
        <div className={styles.reviewInputContainer}>
          리뷰를 남기시려면 로그인해주세요.
        </div>
      )}
    </>
  );
}

export default InputReviewSchedule;
