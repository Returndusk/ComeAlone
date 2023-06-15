import React from 'react';
import ModalScheduleLists from './ModalScheduleLists';
import styles from './OpenModal.module.scss';
import { TfiClose } from 'react-icons/tfi';

function OpenModal(props: { closeModal: () => void }) {
  // useEffect(() => {
  //   function handleClickBackground(e: any) {
  //     if (modalRef.current && !modalRef.current.contains(e.target)) {
  //       props.closeModal();
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickBackground);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickBackground);
  //   };
  // }, []);

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalLayout}>
        <button className={styles.closeBtn} onClick={props.closeModal}>
          <TfiClose />
        </button>
        <div className={styles.scheduleListContainer} id='scheduleContainer'>
          <ModalScheduleLists />
        </div>
      </div>
    </div>
  );
}

export default OpenModal;
