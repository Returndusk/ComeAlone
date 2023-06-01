import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ModalDesign.module.scss';

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
      <button onClick={openModal}>목적지 추가하기</button>
      {isOpen && (
        <div className={styles.modalBackground}>
          <div className={styles.modalLayout}>
            <button onClick={MoveToMySchedule}>일정 추가하기</button>
            <button onClick={closeModal}>창 닫기</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddToScheduleModal;
