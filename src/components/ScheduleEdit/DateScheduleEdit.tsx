import React from 'react';
import styles from './DateScheduleEdit.module.scss';
import { FaCalendarAlt } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateInfoType } from '../../types/ScheduleEditTypes';

function DateScheduleEdit({
  dateInfo,
  onOpenModal
}: {
  dateInfo: DateInfoType;
  onOpenModal: () => void;
}) {
  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString('ko-KR')
      .replace('.', '년 ')
      .replace('.', '월 ')
      .replace('.', '일 ');
  };

  return (
    <div className={styles.dateContainer}>
      <span className={styles.duration}>
        <span>여행 기간</span>
        {`${formatDate(dateInfo.startDate)} ~ ${formatDate(
          dateInfo.endDate
        )} (총 ${dateInfo.duration}일)`}
      </span>
      <Tooltip title='날짜 수정하기' placement='right'>
        <IconButton onClick={onOpenModal} className={styles.dateIcon}>
          <FaCalendarAlt className={styles.durationEdit} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default DateScheduleEdit;
