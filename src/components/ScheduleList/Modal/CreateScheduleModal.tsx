import React, { useEffect, useState } from 'react';
import styles from './CommonModalDesign.module.scss';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import ko from 'date-fns/locale/ko';
import { addDays, format, differenceInDays } from 'date-fns';
import tokenInstance from '../../../apis/tokenInstance';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function CreateScheduleModal(props: { closeModal: () => void }) {
  /**
   * TODO: 모달 창 밖을 클릭해도 닫히도록
   * @param e 현재 지칭된 타겟(모달창 밖)
   * @returns 창닫기 버튼이 아니라 밖을 클릭해도 닫히도록
   * 
  function handleCloseModal(e: React.MouseEvent<HTMLDivElement>) {
    // function handleCloseModal(e: { target: any }) {
    e.stopPropagation();

    const target = e.target as HTMLElement;

    if (target.classList.contains('modalBackground')) {
      // console.log(target.classList);
      closeModal();
    }
  }
   */

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const startDateFormatted = format(date[0].startDate, 'yyyy/MM/dd');
  const endDateFormatted = format(date[0].endDate, 'yyyy/MM/dd');

  /**
   * TODO: any 타입 대신 적절한 타입으로 변환하기
   * @param ranges 현재 찍힌 Date값(Object)
   */
  function handleDateRange(ranges: any) {
    // console.log(ranges);
    setDate([ranges.selection]);
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
      await tokenInstance.post(`${baseUrl}/schedules/basic`, formData);
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
