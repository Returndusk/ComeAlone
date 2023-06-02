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
    <div className={styles.iconsWrapper}>
      <span id={styles.likes}>
        <FaHeart id={styles.likesIcon} />
        {likesAmount}
      </span>
      <span id={styles.reviewNumber}>
        <FaCommentAlt id={styles.reviewNumberIcon} />
        {reviewsAmount}
      </span>
    </div>
  );
}

export default ScheduleDetailIconsComponent;
