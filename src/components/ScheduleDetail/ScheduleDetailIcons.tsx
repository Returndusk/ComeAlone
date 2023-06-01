import React from 'react';
import styles from './ScheduleDetail.module.scss';
import { FaHeart, FaCommentAlt } from 'react-icons/fa';

function ScheduleDetailIconsComponent() {
  return (
    <>
      <span id={styles.likes}>
        <FaHeart id={styles['likes-icon']} />7
      </span>
      <span id={styles['review-number']}>
        <FaCommentAlt id={styles['review-number-icon']} />5
      </span>
    </>
  );
}

export default ScheduleDetailIconsComponent;
