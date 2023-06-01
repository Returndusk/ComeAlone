import React from 'react';
import styles from './ScheduleEdit.module.scss';
import { FaCalendarAlt } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

function ScheduleEditDateComponent({
  duration,
  startDate,
  endDate
}: {
  duration: string;
  startDate: string;
  endDate: string;
}) {
  return (
    <div>
      <span className={styles.duration}>
        {`${startDate} ~ ${endDate} (${duration}일)`}
      </span>
      <Tooltip title='날짜 수정하기' placement='right'>
        <IconButton>
          <FaCalendarAlt className={styles['duration-edit']} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default ScheduleEditDateComponent;
