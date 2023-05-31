import React, { useState } from 'react';
import styles from './ModalDesign.module.scss';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns';

function CreateScheduleModal() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: startDateFormatted,
    endDate: endDateFormatted
  });

  function handleFormData(e: any) {
    // console.log(e.target);
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log('formData', formData);
    closeModal();
  }

  return (
    <>
      <button onClick={openModal}>일정 추가하기</button>
      {isOpen && (
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
                name='description'
                value={formData.description}
                onChange={handleFormData}
              />
              <div>여행 날짜</div>
              <DateRangePicker
                // onChange={(item) => setDate([item.selection])}
                onChange={handleDateRange}
                // showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={date}
                direction='horizontal'
              />
              <p>여행 첫 날 : {startDateFormatted}</p>
              <p>여행 마지막 날 : {endDateFormatted}</p>
              <input type='submit' value='일정 추가하기' id='submitButton' />
            </form>
            <button onClick={closeModal}>창 닫기</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateScheduleModal;
