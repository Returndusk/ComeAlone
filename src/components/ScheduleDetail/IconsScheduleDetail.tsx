import React from 'react';
import styles from './IconsScheduleDetail.module.scss';
import { FaRegHeart, FaHeart, FaCommentAlt } from 'react-icons/fa';
import { IconsScheduleDetailType } from '../../types/ScheduleDetailTypes';

function IconsScheduleDetail({
  doesUserLike,
  likesCount,
  reviewsAmount,
  onUserLike
}: IconsScheduleDetailType) {
  return (
    <div className={styles.iconsContainer}>
      <button id={styles.likes} onClick={() => onUserLike()}>
        {doesUserLike ? (
          <FaHeart id={styles.likesIcon} />
        ) : (
          <FaRegHeart id={styles.likesIcon} />
        )}
        {likesCount}
      </button>
      <span id={styles.reviewNumber}>
        <FaCommentAlt id={styles.reviewNumberIcon} />
        {reviewsAmount}
      </span>
    </div>
  );
}

export default IconsScheduleDetail;
