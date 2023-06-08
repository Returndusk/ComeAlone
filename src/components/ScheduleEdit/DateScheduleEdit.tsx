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
  return (
    <>
      <div className={styles.dateContainer}>
        <span className={styles.duration}>
          {`${dateInfo.startDate.toLocaleDateString(
            'ko-KR'
          )} ~ ${dateInfo.endDate.toLocaleDateString('ko-KR')} (${
            dateInfo.duration
          }일)`}
        </span>
        <Tooltip title='날짜 수정하기' placement='right'>
          <IconButton onClick={onOpenModal}>
            <FaCalendarAlt className={styles.durationEdit} />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
}

export default DateScheduleEdit;
