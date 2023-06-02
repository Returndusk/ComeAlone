import React from 'react';
import styles from './ScheduleEdit.module.scss';
import TextField from '@mui/material/TextField';

function ScheduleEditInfoComponent({
  title,
  writer,
  date,
  description,
  handleTitle,
  handleDescription
}: {
  title: string;
  writer: string;
  date: string;
  description: string;
  handleTitle: any;
  handleDescription: any;
}) {
  return (
    <div className={styles.ScheduleInfoWrapper}>
      <TextField
        className={styles.title}
        required
        label='제목'
        defaultValue={title}
        onChange={(event) => handleTitle(event.target.value)}
      />
      <div className={styles.writer}>{writer}</div>
      <div className={styles.date}>{date}</div>
      <TextField
        className={styles.description}
        required
        label='일정 소개'
        multiline
        rows={3}
        defaultValue={description}
        onChange={(event) => handleDescription(event.target.value)}
      />
    </div>
  );
}

export default ScheduleEditInfoComponent;
