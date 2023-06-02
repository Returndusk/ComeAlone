import React, { useState } from 'react';
import styles from './ScheduleDetail.module.scss';
import Avatar from '@mui/material/Avatar';

function ScheduleReviewInputComponent({ onSubmit }: { onSubmit: any }) {
  const [reviewTyping, setReviewTyping] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewTyping(event.target.value);
  };

  return (
    <div className={styles['review-input-wrapper']}>
      <Avatar className={styles['reviews-input-writer']}>B</Avatar>
      <textarea
        className={styles['reviews-input-text']}
        onChange={handleChange}
      ></textarea>
      <button
        className={styles['reviews-input-button']}
        onClick={() => {
          onSubmit(reviewTyping);
        }}
      >
        제출
      </button>
    </div>
  );
}

export default ScheduleReviewInputComponent;
