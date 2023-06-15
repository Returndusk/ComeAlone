import React, { useState, Dispatch, SetStateAction } from 'react';
import styles from './DateModalScheduleEdit.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { DateRange } from 'react-date-range';
import ko from 'date-fns/locale/ko';
import { TfiClose } from 'react-icons/tfi';
import { DateInfoType, DateSelectionType } from '../../types/ScheduleEditTypes';
import AlertModal from '../common/Alert/AlertModal';
import { SECONDS_OF_DAY } from '../../constants/Schedule';

function getDateInfoFromSelected(
  selectedDate: DateSelectionType
): DateInfoType {
  const { startDate, endDate } = selectedDate;
  const duration = Math.floor(
    (endDate.getTime() - startDate.getTime()) / SECONDS_OF_DAY + 1
  );

  return { startDate, endDate, duration };
}

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
  const [showDiffDurationAlert, setShowDiffDurationAlert] =
    useState<boolean>(false);
  const [showMaximumDurationAlert, setShowMaximumDurationAlert] =
    useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateSelectionType[]>([
    {
      startDate: dateInfo.startDate,
      endDate: dateInfo.endDate,
      key: 'selection'
    }
  ]);

  const handleDateInfoUpdate = () => {
    const prevDuration = dateInfo.duration;
    const currentDuration = getDateInfoFromSelected(selectedDate[0]).duration;

    if (currentDuration > 30) {
      setShowMaximumDurationAlert(true);

      return;
    }

    if (currentDuration < prevDuration) {
      setShowDiffDurationAlert(true);

      return;
    }

    handleDateInfoUpdateConfirm();
  };

  const handleDateInfoUpdateConfirm = () => {
    const updatedDateInfo = getDateInfoFromSelected(selectedDate[0]);

    onDateInfoUpdate(updatedDateInfo);
    setShowDiffDurationAlert(false);
  };

  return (
    <>
      <Modal open={openModal} onClose={onModalClose}>
        <Box className={styles.durationEditModal}>
          <p>수정하실 날짜를 선택하세요.</p>
          <TfiClose onClick={onModalClose} className={styles.closeButton} />
          <DateRange
            className={styles.durationEditModalDate}
            locale={ko}
            editableDateInputs={true}
            rangeColors={['#ef6d00']}
            onChange={(range) => {
              if (
                range['selection'].startDate === undefined ||
                range['selection'].endDate === undefined ||
                range['selection'].key === undefined
              ) {
                return;
              } else {
                setSelectedDate([range['selection']] as DateSelectionType[]);
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
      {showDiffDurationAlert && (
        <AlertModal
          message='기존 일정보다 짧은 기간으로 수정할 경우, 초과된 기간의 기존 목적지가 삭제됩니다.'
          showCancelButton={true}
          onConfirm={() => handleDateInfoUpdateConfirm()}
          onCancel={() => setShowDiffDurationAlert(false)}
        />
      )}
      {showMaximumDurationAlert && (
        <AlertModal
          message='여행 기간은 최대 30일까지만 가능합니다.'
          onConfirm={() => setShowMaximumDurationAlert(false)}
        />
      )}
    </>
  );
}

export default DateModalScheduleEdit;
