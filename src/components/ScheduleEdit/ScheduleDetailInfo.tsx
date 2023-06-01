import React from 'react';
import styles from './ScheduleEdit.module.scss';
import TextField from '@mui/material/TextField';

function ScheduleDetailInfoComponent({
  duration,
  title,
  writer,
  startDate,
  endDate,
  date,
  description
}: {
  duration: string;
  title: string;
  writer: string;
  startDate: string;
  endDate: string;
  date: string;
  description: string;
}) {
  return (
    <div className={styles['schedule-info-wrapper']}>
      <div className={styles.duration}>
        {`${startDate} ~ ${endDate} (${duration}일)`}
      </div>
      <TextField
        className={styles.title}
        required
        label='제목'
        defaultValue={title}
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
      />
    </div>
  );
}

export default ScheduleDetailInfoComponent;
