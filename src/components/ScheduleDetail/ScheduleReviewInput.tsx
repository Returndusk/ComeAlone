import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';

function ScheduleReviewInputComponent({ onSubmit }: { onSubmit: any }) {
  const [reviewTyping, setReviewTyping] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewTyping(event.target.value);
  };

  return (
    <>
      <Avatar className='reviews-input-writer'>B</Avatar>
      <textarea
        className='reviews-input-text'
        onChange={handleChange}
      ></textarea>
      <button
        className='reviews-input-button'
        onClick={() => {
          onSubmit(reviewTyping);
        }}
      >
        제출
      </button>
    </>
  );
}

export default ScheduleReviewInputComponent;
