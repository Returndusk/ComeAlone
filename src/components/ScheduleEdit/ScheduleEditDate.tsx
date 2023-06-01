import React, { useState } from 'react';
import styles from './ScheduleEdit.module.scss';
import { FaCalendarAlt } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import ko from 'date-fns/locale/ko';

function ScheduleEditDateComponent({
  duration,
  startDate,
  endDate
}: {
  duration: string;
  startDate: string;
  endDate: string;
}) {
  type selectionType = {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    key?: string | undefined;
  };
  const dateNow: selectionType = {
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: 'selection'
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedDate, setSelectedDate] = useState([dateNow]);

  return (
    <>
      <div className={styles['duration-wrapper']}>
        <span className={styles.duration}>
          {`${startDate} ~ ${endDate} (${duration}일)`}
        </span>
        <Tooltip title='날짜 수정하기' placement='right'>
          <IconButton onClick={handleOpen}>
            <FaCalendarAlt className={styles['duration-edit']} />
          </IconButton>
        </Tooltip>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box className={styles['duration-edit-modal']}>
          <p>수정하실 날짜를 선택하세요.</p>
          <DateRange
            className={styles['duration-edit-date']}
            locale={ko}
            editableDateInputs={true}
            onChange={(range) => {
              if (
                range['selection'].startDate === undefined ||
                range['selection'].endDate === undefined ||
                range['selection'].key === undefined
              ) {
                return;
              } else {
                setSelectedDate([range['selection']]);
              }
            }}
            moveRangeOnFirstSelection={false}
            ranges={selectedDate}
            months={2}
            direction='horizontal'
          />
          <button
            className={styles['duration-edit-confirm']}
            onClick={handleClose}
          >
            완료
          </button>
        </Box>
      </Modal>
    </>
  );
}

export default ScheduleEditDateComponent;
