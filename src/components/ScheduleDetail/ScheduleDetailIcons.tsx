import React from 'react';
import styles from './ScheduleDetail.module.scss';
import { FaHeart, FaCommentAlt } from 'react-icons/fa';

function ScheduleDetailIconsComponent({
  likesAmount,
  reviewsAmount
}: {
  likesAmount: number;
  reviewsAmount: number;
}) {
  return (
    <div className={styles['icons-wrapper']}>
      <span id={styles.likes}>
        <FaHeart id={styles['likes-icon']} />
        {likesAmount}
      </span>
      <span id={styles['review-number']}>
        <FaCommentAlt id={styles['review-number-icon']} />
        {reviewsAmount}
      </span>
    </div>
  );
}

export default ScheduleDetailIconsComponent;
