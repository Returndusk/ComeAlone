import React from 'react';
import styles from './IconsScheduleDetail.module.scss';
import { useAuthState } from '../../contexts/AuthContext';
import { FaRegHeart, FaHeart, FaCommentAlt } from 'react-icons/fa';
import { IconsScheduleDetailType } from '../../types/ScheduleDetailTypes';

function IconsScheduleDetail({
  doesUserLike,
  likesCount,
  reviewsAmount,
  onUserLike
}: IconsScheduleDetailType) {
  const { authState } = useAuthState();

  return (
    <div className={styles.iconsContainer}>
      <button
        id={authState.isLoggedIn ? styles.likes : styles.likesDisabled}
        onClick={() => {
          if (authState.isLoggedIn) {
            onUserLike();
          } else {
            return;
          }
        }}
      >
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
