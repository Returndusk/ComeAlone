import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './DateModalScheduleEdit.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { DateRange } from 'react-date-range';
import ko from 'date-fns/locale/ko';
import { DateInfoType, DateSelectionType } from '../../types/ScheduleEditTypes';

function DateModalScheduleEdit({
  openModal,
  dateInfo,
  onDateInfoUpdate,
  onModalClose
}: {
  openModal: boolean;
  dateInfo: DateInfoType;
  onDateInfoUpdate: Dispatch<SetStateAction<DateInfoType>>;
  onModalClose: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState<DateSelectionType[]>([
    {
      startDate: dateInfo.startDate,
      endDate: dateInfo.endDate,
      key: 'selection'
    }
  ]);

  const handleDateInfoUpdate = () => {
    const { startDate, endDate } = selectedDate[0];

    if (startDate && endDate) {
      const diffDay =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

      onDateInfoUpdate({ startDate, endDate, duration: diffDay });
    }
  };

  return (
    <Modal open={openModal} onClose={onModalClose}>
      <Box className={styles.durationEditModal}>
        <p>수정하실 날짜를 선택하세요.</p>
        <DateRange
          className={styles.durationEditModalDate}
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
          className={styles.durationEditModalConfirm}
          onClick={() => {
            handleDateInfoUpdate();
            onModalClose();
          }}
        >
          완료
        </button>
      </Box>
    </Modal>
  );
}

export default DateModalScheduleEdit;
