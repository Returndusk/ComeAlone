import React, { useState } from 'react';
import { useAuthState } from '../../contexts/AuthContext';
import styles from './InputReviewSchedule.module.scss';
import TextField from '@mui/material/TextField';
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
          <TextField
            className={styles.reviewsInputText}
            onChange={handleChange}
            label='리뷰를 입력하세요.'
            value={reviewTyping}
          />
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
