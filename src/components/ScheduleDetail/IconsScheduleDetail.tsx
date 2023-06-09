import React from 'react';
import styles from './IconsScheduleDetail.module.scss';
import { FaRegHeart, FaHeart, FaCommentAlt } from 'react-icons/fa';
import { IconsScheduleDetailType } from '../../types/ScheduleDetailTypes';

function IconsScheduleDetail({
  doesUserLike,
  likesAmount,
  reviewsAmount
}: IconsScheduleDetailType) {
  return (
    <div className={styles.iconsContainer}>
      <span id={styles.likes}>
        {doesUserLike ? (
          <FaHeart id={styles.likesIcon} />
        ) : (
          <FaRegHeart id={styles.likesIcon} />
        )}
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
