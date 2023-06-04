import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalScheduleLists from './ModalScheduleLists';
import styles from './CommonModalDesign.module.scss';

function AddToScheduleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function MoveToMySchedule() {
    navigate('/schedule/list');
  }

  return (
    <>
      <button onClick={openModal} className={styles.addScheduleBtn}>
        내 일정에 추가하기
      </button>
      {isOpen && (
        <div className={styles.modalBackground}>
          <div className={styles.modalLayout}>
            <button onClick={MoveToMySchedule}>새로운 일정 만들기</button>
            <ModalScheduleLists />
            <button onClick={closeModal}>창 닫기</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddToScheduleModal;
