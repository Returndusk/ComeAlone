import React from 'react';
import styles from './InfoScheduleEdit.module.scss';
import TextField from '@mui/material/TextField';
import { ScheduleEditInfoType } from '../../types/ScheduleEditTypes';

function InfoScheduleEdit({
  updatedTitle,
  updatedSummary,
  createdAt,
  updatedAt,
  onTitleUpdate,
  onSummaryUpdate
}: ScheduleEditInfoType) {
  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString('ko-KR')
      .replace('.', '년 ')
      .replace('.', '월 ')
      .replace('.', '일 ');
  };

  return (
    <div className={styles.ScheduleInfoContainer}>
      <div className={styles.date}>
        <span>{formatDate(createdAt)} 작성</span>
        <span>{formatDate(updatedAt)} 수정</span>
      </div>
      <TextField
        className={styles.title}
        sx={{
          '& label.Mui-focused': { color: '#ef6d00' },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#fe9036',
              borderWidth: '1px'
            }
          }
        }}
        inputProps={{
          maxLength: 30
        }}
        required
        label='제목 (최대 30자)'
        value={updatedTitle}
        onChange={(event) => onTitleUpdate(event.target.value)}
      />
      <TextField
        className={styles.description}
        sx={{
          '& label.Mui-focused': { color: '#ef6d00' },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#fe9036',
              borderWidth: '1px'
            }
          }
        }}
        inputProps={{
          maxLength: 300
        }}
        required
        label='일정 소개 (최대 300자)'
        multiline
        rows={4}
        value={updatedSummary}
        onChange={(event) => onSummaryUpdate(event.target.value)}
      />
    </div>
  );
}

export default InfoScheduleEdit;
