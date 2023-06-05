import React, { Dispatch, SetStateAction } from 'react';
import styles from './InfoScheduleEdit.module.scss';
import TextField from '@mui/material/TextField';

type InfoScheduleEditType = {
  title: string;
  writer: string;
  date: string;
  description: string;
  handleTitle: Dispatch<SetStateAction<string>>;
  handleDescription: Dispatch<SetStateAction<string>>;
};

function InfoScheduleEdit({
  title,
  writer,
  date,
  description,
  handleTitle,
  handleDescription
}: InfoScheduleEditType) {
  return (
    <div className={styles.ScheduleInfoContainer}>
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

export default InfoScheduleEdit;
