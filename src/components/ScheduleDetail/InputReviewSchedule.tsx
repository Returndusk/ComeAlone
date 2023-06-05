import React, { useState } from 'react';
import styles from './InputReviewSchedule.module.scss';
import Avatar from '@mui/material/Avatar';

function InputReviewSchedule({ onSubmit }: { onSubmit: any }) {
  const [reviewTyping, setReviewTyping] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewTyping(event.target.value);
  };

  return (
    <div className={styles.reviewInputContainer}>
      <Avatar className={styles.reviewsInputWriter}>B</Avatar>
      <textarea
        className={styles.reviewsInputText}
        onChange={handleChange}
      ></textarea>
      <button
        className={styles.reviewsInputButton}
        onClick={() => {
          onSubmit(reviewTyping);
        }}
      >
        제출
      </button>
    </div>
  );
}

export default InputReviewSchedule;
