import React, { useEffect, useState } from 'react';
import styles from './CreateScheduleModal.module.scss';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { TextField } from '@mui/material';
import { TfiClose } from 'react-icons/tfi';
import { DateRange, RangeKeyDict } from 'react-date-range';
import ko from 'date-fns/locale/ko';
import { addDays, format, differenceInDays } from 'date-fns';
import tokenInstance from '../../../apis/tokenInstance';
import { MyScheduleCardType } from '../../../types/ScheduleTypes';
import AlertModal from '../../common/Alert/AlertModal';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function CreateScheduleModal(props: {
  closeModal: () => void;
  onAdd: (schedule: MyScheduleCardType) => void;
}) {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const startDateFormatted = format(date[0].startDate, 'yyyy/MM/dd').split('/');
  const endDateFormatted = format(date[0].endDate, 'yyyy/MM/dd').split('/');

  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [isValidAlert, setIsValidAlert] = useState<boolean>(false);
  const [consoleAlert, setConsoleAlert] = useState<boolean>(false);

  function handleDateRange(ranges: RangeKeyDict) {
    const { startDate, endDate } = ranges.selection;

    if (differenceInDays(Number(endDate), Number(startDate)) > 30) {
      setIsValidAlert(true);
      return;
    }

    setDate([
      {
        startDate: startDate || new Date(),
        endDate: endDate || addDays(new Date(), 7),
        key: 'selection'
      }
    ]);
  }

  useEffect(() => {
    const { startDate, endDate } = date[0];
    const duration = differenceInDays(endDate, startDate) + 1;

    setFormData((prev) => ({
      ...prev,
      start_date: String(startDate),
      end_date: String(endDate),
      duration
    }));
  }, [date]);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    start_date: '',
    end_date: '',
    duration: 0
  });

  function handleFormData(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e.target);
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      formData.title.trim() === '' ||
      formData.summary.trim() === '' ||
      formData.start_date.trim() === '' ||
      formData.end_date.trim() === '' ||
      formData.duration === 0
    ) {
      setShowFailAlert(true);
      return;
    }

    try {
      // console.log('formData', formData);
      const response = await tokenInstance.post(
        `${baseUrl}/schedules/basic`,
        formData
      );
      props.onAdd(response.data);
      setShowSuccessAlert(true);
    } catch (err) {
      // console.error('Error: ', err);
      setConsoleAlert(true);
      return;
    }
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalLayout}>
        <form
          action=''
          method='post'
          name='schedule_input'
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        >
          <h1>여행 날짜 선택</h1>
          <DateRange
            locale={ko}
            editableDateInputs={true}
            onChange={handleDateRange}
            moveRangeOnFirstSelection={false}
            className={styles.calendar}
            months={2}
            ranges={date}
            direction='horizontal'
            rangeColors={[`var(--main-color)`]}
          />
          <div className={styles.textContainer}>
            <div className={styles.texts}>
              <TextField
                id='title'
                variant='outlined'
                label='일정 제목(최대 30자)'
                name='title'
                value={formData.title}
                onChange={handleFormData}
                size='small'
                style={{ width: '100%' }}
                inputProps={{
                  maxLength: 30
                }}
                sx={{
                  '& label.Mui-focused': { color: `var(--main-color)` },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#fe9036',
                      borderWidth: '1px'
                    }
                  }
                }}
              />
              <TextField
                id='summary'
                variant='outlined'
                label='일정 소개(최대 300자)'
                name='summary'
                value={formData.summary}
                rows={3}
                multiline
                onChange={handleFormData}
                size='small'
                style={{ width: '100%' }}
                inputProps={{
                  maxLength: 300
                }}
                sx={{
                  '& label.Mui-focused': { color: `var(--main-color)` },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#fe9036',
                      borderWidth: '1px'
                    }
                  }
                  // '&:hover': {
                  //   borderColor: '#ef6d00'
                  // }
                }}
              />
            </div>
            <div className={styles.dates}>
              <p>
                <span>여행 시작 일자</span>
                {startDateFormatted[0]}년 {startDateFormatted[1]}월{' '}
                {startDateFormatted[2]}일
              </p>
              <p>
                <span>여행 종료 일자</span>
                {endDateFormatted[0]}년 {endDateFormatted[1]}월{' '}
                {endDateFormatted[2]}일
              </p>
              <input
                type='submit'
                value='새로운 일정 추가'
                id='submitButton'
                className={styles.submitBtn}
              />
            </div>
          </div>
        </form>
        <button className={styles.closeBtn} onClick={props.closeModal}>
          <TfiClose />
        </button>
      </div>
      {showFailAlert && (
        <div className={styles.alertModal}>
          <AlertModal
            message='일정 정보를 모두 입력해 주세요.'
            onConfirm={() => setShowFailAlert(false)}
            showCancelButton={false}
          />
        </div>
      )}
      {showSuccessAlert && (
        <AlertModal
          message='새로운 일정이 추가되었습니다!'
          onConfirm={() => {
            setShowSuccessAlert(false);
            props.closeModal();
          }}
          showCancelButton={false}
        />
      )}
      {isValidAlert && (
        <AlertModal
          message='일정은 최대 30일까지 등록할 수 있습니다.'
          onConfirm={() => {
            setIsValidAlert(false);
          }}
          showCancelButton={false}
        />
      )}
      {consoleAlert && (
        <AlertModal
          message='오류가 발생했습니다.'
          onConfirm={() => {
            setConsoleAlert(false);
          }}
          showCancelButton={false}
        />
      )}
    </div>
  );
}

export default CreateScheduleModal;
