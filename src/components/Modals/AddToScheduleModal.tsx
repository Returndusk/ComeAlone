import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './ModalDesign.module.scss';
import ScheduleList from '../../pages/ScheduleList';

function AddToScheduleModal() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={openModal}>목적지 추가하기</button>
      {isOpen && (
        <div className={styles.modalBackground}>
          <div className={styles.modalLayout}>
            <button
              onClick={() => {
                return (
                  <BrowserRouter>
                    <Routes>
                      <Route path='/schedule/list' element={<ScheduleList />} />
                    </Routes>
                  </BrowserRouter>
                );
              }}
            >
              일정 추가하기
            </button>
            <button onClick={closeModal}>창 닫기</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddToScheduleModal;
