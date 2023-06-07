import React, { useState } from 'react';
import styles from './InputReviewSchedule.module.scss';
import Avatar from '@mui/material/Avatar';

function InputReviewSchedule({
  onReviewSubmit
}: {
  onReviewSubmit: (input: string) => void;
}) {
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
          onReviewSubmit(reviewTyping);
        }}
      >
        제출
      </button>
    </div>
  );
}

export default InputReviewSchedule;
