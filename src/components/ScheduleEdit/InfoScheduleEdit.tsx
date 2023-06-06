import React from 'react';
import styles from './InfoScheduleEdit.module.scss';
import TextField from '@mui/material/TextField';
import { ScheduleEditInfoType } from '../../types/ScheduleEdit';

function InfoScheduleEdit({
  updatedTitle,
  nickname,
  createdAt,
  updatedSummary,
  onTitleUpdate,
  onSummaryUpdate
}: ScheduleEditInfoType) {
  return (
    <div className={styles.ScheduleInfoContainer}>
      <TextField
        className={styles.title}
        required
        label='제목'
        defaultValue={updatedTitle}
        onChange={(event) => onTitleUpdate(event.target.value)}
      />
      <div className={styles.writer}>{nickname}</div>
      <div className={styles.date}>{createdAt}</div>
      <TextField
        className={styles.description}
        required
        label='일정 소개'
        multiline
        rows={3}
        defaultValue={updatedSummary}
        onChange={(event) => onSummaryUpdate(event.target.value)}
      />
    </div>
  );
}

export default InfoScheduleEdit;
