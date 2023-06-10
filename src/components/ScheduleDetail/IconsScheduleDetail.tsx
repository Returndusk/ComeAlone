import React from 'react';
import styles from './IconsScheduleDetail.module.scss';
import { useAuthState } from '../../contexts/AuthContext';
import { Tooltip } from '@mui/material';
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
      {authState.isLoggedIn ? (
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
      ) : (
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
      )}
      <span id={styles.reviewNumber}>
        <FaCommentAlt id={styles.reviewNumberIcon} />
        {reviewsAmount}
      </span>
    </div>
  );
}

export default IconsScheduleDetail;
