import React from 'react';
import ModalScheduleLists from './ModalScheduleLists';
import styles from './OpenModal.module.scss';
import { TfiClose } from 'react-icons/tfi';

function OpenModal(props: { closeModal: () => void }) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalLayout}>
        <button className={styles.closeBtn} onClick={props.closeModal}>
          <TfiClose />
        </button>
        <div className={styles.scheduleListContainer} id='scheduleContainer'>
          <ModalScheduleLists />
          {/* {isLoading ? (
            <p>Loading...</p> // Loading display here, replace with your actual loading component or spinner
          ) : (
            <ModalScheduleLists onLoadingComplete={handleLoadingComplete} />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default OpenModal;
