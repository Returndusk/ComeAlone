import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModalScheduleLists from './ModalScheduleLists';
import styles from './CommonModalDesign.module.scss';

function OpenModal(props: { closeModal: () => void }) {
  const navigate = useNavigate();

  function MoveToMySchedule() {
    navigate('/myschedule/list');
  }

  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modalLayout}>
          <button onClick={MoveToMySchedule}>새로운 일정 만들기</button>
          <ModalScheduleLists />
          <button onClick={props.closeModal}>창 닫기</button>
        </div>
      </div>
    </>
  );
}

export default OpenModal;
