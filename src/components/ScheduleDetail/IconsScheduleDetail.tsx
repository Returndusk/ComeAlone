import React from 'react';
import styles from './IconsScheduleDetail.module.scss';
import { useAuthState } from '../../contexts/AuthContext';
import { Tooltip } from '@mui/material';
import { FaRegHeart, FaHeart, FaCommentAlt } from 'react-icons/fa';
import { IconsScheduleDetailType } from '../../types/ScheduleDetailTypes';

function IconsScheduleDetail({
  userId,
  doesUserLike,
  likesCount,
  reviewsAmount,
  onUserLike
}: IconsScheduleDetailType) {
  const { authState } = useAuthState();
  const { isLoggedIn } = authState;
  const loggedInUserId = authState.user?.id;

  if (!isLoggedIn) {
    return (
      <div className={styles.iconsContainer}>
        <Tooltip title='좋아요 하시려면 로그인해주세요.' placement='top'>
          <button
            id={styles.likesDisabled}
            onClick={() => {
              return;
            }}
          >
            <FaRegHeart id={styles.likesIcon} />
            {likesCount}
          </button>
        </Tooltip>
        <span id={styles.reviewNumber}>
          <FaCommentAlt id={styles.reviewNumberIcon} />
          {reviewsAmount}
        </span>
      </div>
    );
  }

  if (userId === loggedInUserId) {
    return (
      <div className={styles.iconsContainer}>
        <Tooltip title='자신의 일정에는 좋아요할 수 없습니다.' placement='top'>
          <button
            id={styles.likesDisabled}
            onClick={() => {
              return;
            }}
          >
            <FaRegHeart id={styles.likesIcon} />
            {likesCount}
          </button>
        </Tooltip>
        <span id={styles.reviewNumber}>
          <FaCommentAlt id={styles.reviewNumberIcon} />
          {reviewsAmount}
        </span>
      </div>
    );
  }

  return (
    <div className={styles.iconsContainer}>
      <button
        id={styles.likes}
        onClick={() => {
          onUserLike();
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
