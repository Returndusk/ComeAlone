import React from 'react';
import styles from './IconsScheduleDetail.module.scss';
import { FaHeart, FaCommentAlt } from 'react-icons/fa';

type IconsScheduleDetailType = {
  likesAmount: number;
  reviewsAmount: number;
};

function IconsScheduleDetail({
  likesAmount,
  reviewsAmount
}: IconsScheduleDetailType) {
  return (
    <div className={styles.iconsContainer}>
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

export default IconsScheduleDetail;
