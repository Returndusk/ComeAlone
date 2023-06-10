import React, { useEffect, useState } from 'react';
import styles from './CommonModalDesign.module.scss';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, RangeKeyDict } from 'react-date-range';
import ko from 'date-fns/locale/ko';
import { addDays, format, differenceInDays } from 'date-fns';
import tokenInstance from '../../../apis/tokenInstance';
import { MyScheduleCardType } from '../../../types/ScheduleTypes';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function CreateScheduleModal(props: {
  closeModal: () => void;
  onAdd: (schedule: MyScheduleCardType) => void;
}) {
  // const modalRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   function handleClickBackground(e: React.MouseEvent<HTMLElement>) {
  //     if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
  //       props.closeModal();
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickBackground);

  //   return () => {
  //     // cleanup - 컴포넌트 unmount 시 리스너 제거
  //     document.removeEventListener('mousedown', handleClickBackground);
  //   };
  // }, []);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const startDateFormatted = format(date[0].startDate, 'yyyy/MM/dd');
  const endDateFormatted = format(date[0].endDate, 'yyyy/MM/dd');

  function handleDateRange(ranges: RangeKeyDict) {
    const { startDate, endDate } = ranges.selection;

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
      alert('일정 정보를 모두 입력해주세요!');
      return;
    }

    try {
      console.log('formData', formData);
      const response = await tokenInstance.post(
        `${baseUrl}/schedules/basic`,
        formData
      );
      props.onAdd(response.data);
      // 여기에 득열님 alert 활용
      alert('일정이 추가되었습니다!');
      props.closeModal();
    } catch (err) {
      console.error('Error: ', err);
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
        >
          <label>여행 제목 : </label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleFormData}
          />
          <br />
          <label>한 줄 소개 : </label>
          <input
            type='text'
            name='summary'
            value={formData.summary}
            onChange={handleFormData}
          />
          <div>여행 날짜</div>
          <DateRange
            locale={ko}
            editableDateInputs={true}
            onChange={handleDateRange}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={date}
            direction='horizontal'
          />
          <p>여행 첫 날 : {startDateFormatted}</p>
          <p>여행 마지막 날 : {endDateFormatted}</p>
          <input type='submit' value='일정 추가하기' id='submitButton' />
        </form>
        <button onClick={props.closeModal}>창 닫기</button>
      </div>
    </div>
  );
}

export default CreateScheduleModal;
