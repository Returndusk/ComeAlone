import React, { useState } from 'react';
import styles from './IconsScheduleDetail.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthState } from '../../contexts/AuthContext';
import { Tooltip } from '@mui/material';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { ScheduleDetailIconsType } from '../../types/ScheduleDetailTypes';
import AlertModal from '../common/Alert/AlertModal';
import ROUTER from '../../constants/Router';

function IconsScheduleDetail({
  userId,
  doesUserLike,
  likesCount,
  onUserLike
}: ScheduleDetailIconsType & { onUserLike: () => void }) {
  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;
  const isLoggedIn: boolean = useAuthState().authState.isLoggedIn as boolean;
  const loggedInUserId: string = useAuthState().authState.user?.id as string;
  const [showIsLoggedInModal, setShowIsLoggedInModal] =
    useState<boolean>(false);

  const handleUserLike = () => {
    if (!isLoggedIn) {
      setShowIsLoggedInModal(true);

      return;
    }

    onUserLike();
  };

  return userId === loggedInUserId ? (
    <div className={styles.iconsContainer}>
      <Tooltip title='자신의 일정에는 좋아요할 수 없습니다.' placement='top'>
        <button id={styles.likesDisabled}>
          <FaRegHeart id={styles.likesIcon} />
          좋아요 {likesCount}개
        </button>
      </Tooltip>
    </div>
  ) : (
    <div className={styles.iconsContainer}>
      <button id={styles.likes} onClick={handleUserLike}>
        {doesUserLike ? (
          <FaHeart id={styles.likesIcon} />
        ) : (
          <FaRegHeart id={styles.likesIcon} />
        )}
        좋아요 {likesCount}개
      </button>
      {showIsLoggedInModal && (
        <AlertModal
          title='로그인이 필요합니다.'
          message='로그인하시겠습니까?'
          onConfirm={() =>
            navigate(ROUTER.LOGIN, { state: { prevUrl: currentUrl } })
          }
          onCancel={() => setShowIsLoggedInModal(false)}
          showTitle={true}
          showCancelButton={true}
        />
      )}
    </div>
  );
}

export default IconsScheduleDetail;
