import React, { useState } from 'react';
import styles from './ScheduleEdit.module.scss';
import { FaCalendarAlt } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function ScheduleEditDateComponent({
  duration,
  startDate,
  endDate
}: {
  duration: string;
  startDate: string;
  endDate: string;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <div>hello</div>
        </Box>
      </Modal>
    </>
  );
}

export default ScheduleEditDateComponent;
