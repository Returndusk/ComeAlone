import React from 'react';
import styles from './IconsScheduleDetail.module.scss';
import { useAuthState } from '../../contexts/AuthContext';
import { Tooltip } from '@mui/material';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { ScheduleDetailIconsType } from '../../types/ScheduleDetailTypes';

function IconsScheduleDetail({
  userId,
  doesUserLike,
  likesCount,
  onUserLike
}: ScheduleDetailIconsType & { onUserLike: () => void }) {
  const isLoggedIn: boolean = useAuthState().authState.isLoggedIn as boolean;
  const loggedInUserId: string = useAuthState().authState.user?.id as string;

  return isLoggedIn ? (
    userId === loggedInUserId ? (
      <div className={styles.iconsContainer}>
        <Tooltip title='자신의 일정에는 좋아요할 수 없습니다.' placement='top'>
          <button id={styles.likesDisabled}>
            <FaRegHeart id={styles.likesIcon} />
            {likesCount}
          </button>
        </Tooltip>
      </div>
    ) : (
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
      </div>
    )
  ) : (
    <div className={styles.iconsContainer}>
      <Tooltip title='좋아요 하시려면 로그인해주세요.' placement='top'>
        <button id={styles.likesDisabled}>
          <FaRegHeart id={styles.likesIcon} />
          {likesCount}
        </button>
      </Tooltip>
    </div>
  );
}

export default IconsScheduleDetail;
