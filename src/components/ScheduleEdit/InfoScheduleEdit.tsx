import React from 'react';
import styles from './InfoScheduleEdit.module.scss';
import TextField from '@mui/material/TextField';
import { ScheduleEditInfoType } from '../../types/ScheduleEditTypes';

function InfoScheduleEdit({
  updatedTitle,
  updatedSummary,
  createdAt,
  onTitleUpdate,
  onSummaryUpdate
}: ScheduleEditInfoType) {
  return (
    <div className={styles.ScheduleInfoContainer}>
      <div className={styles.createdAt}>
        작성일: {createdAt.toLocaleDateString('ko-KR')}
      </div>
      <TextField
        className={styles.title}
        required
        label='제목'
        defaultValue={updatedTitle}
        onChange={(event) => onTitleUpdate(event.target.value)}
      />
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
