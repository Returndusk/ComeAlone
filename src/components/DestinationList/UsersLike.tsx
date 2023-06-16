import React, { useCallback, useEffect, useState } from 'react';
import styles from './UsersLike.module.scss';
import { postPreferredDestinationsByDestinationId } from '../../apis/destinationListAPI';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { specifiedCategoryDestinationsType } from '../../types/DestinationListTypes';
import AlertModal from '../common/Alert/AlertModal';
import { useAuthState } from '../../contexts/AuthContext';

type UsersLikePropsType = {
  destinationDetails: specifiedCategoryDestinationsType | null;
};

const ALERT_PROPS = {
  message: '로그인이 필요한 기능입니다.',
  showTitle: false
};

const COUNTS_PER_USER_CLICK = {
  COUNT: 1,
  DEFAULT_COUNT: 0
};

function UsersLike({ destinationDetails }: UsersLikePropsType) {
  const [isUserClickLike, setIsUserClickLike] = useState<boolean>(false);
  const [preferCounter, setPreferCounter] = useState<number>(
    COUNTS_PER_USER_CLICK.DEFAULT_COUNT
  );
  const { authState } = useAuthState();
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const { contentid } = useParams();
  const navigate = useNavigate();
  const url = useLocation().pathname;

  const getUsersPreferData = useCallback(() => {
    const usersId = authState?.user?.id;
    const preferUserList = destinationDetails?.destination_likes;
    const accessUserPreferInfo = preferUserList?.find(
      (user) => user.user_id === usersId
    );
    if (accessUserPreferInfo) {
      setIsUserClickLike(true);
    }
    setPreferCounter(() => {
      return (
        destinationDetails?.destination_likes_count ??
        COUNTS_PER_USER_CLICK.DEFAULT_COUNT
      );
    });
  }, [setIsUserClickLike, destinationDetails, authState]);

  useEffect(() => {
    getUsersPreferData();
  }, [getUsersPreferData]);

  const postUsersPreferData = useCallback(
    async (destinationId: number) => {
      const res = await postPreferredDestinationsByDestinationId(destinationId);
      const usersPreferData = res?.data.is_liked;
      setIsUserClickLike(() => usersPreferData);
      setPreferCounter(() =>
        isUserClickLike
          ? preferCounter - COUNTS_PER_USER_CLICK.COUNT
          : preferCounter + COUNTS_PER_USER_CLICK.COUNT
      );
      return;
    },
    [setIsUserClickLike, isUserClickLike, setPreferCounter, preferCounter]
  );

  const handleLikeClick = async () => {
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    setIsUserClickLike(() => !destinationDetails?.destination_likes);
    await postUsersPreferData(Number(contentid));
    return;
  };

  useEffect(() => {
    setPreferCounter(() => {
      return (
        destinationDetails?.destination_likes_count ??
        COUNTS_PER_USER_CLICK.DEFAULT_COUNT
      );
    });
  }, [setPreferCounter, destinationDetails]);

  const handleOnLoginConfirm = () => {
    setIsShowAlert(false);
    navigate('/login', { state: { prevUrl: url } });
  };

  return (
    <>
      {destinationDetails && (
        <div className={styles.usersLikesbox}>
          <button className={styles.likesButton} onClick={handleLikeClick}>
            {isUserClickLike ? (
              <FaHeart id={styles.likesIcon} />
            ) : (
              <FaRegHeart id={styles.canceledLikesIcon} />
            )}
          </button>
          <span id={styles.likesLabel}>좋아요{`ㆍ${preferCounter}개`}</span>
        </div>
      )}
      {isShowAlert && (
        <AlertModal
          message={ALERT_PROPS.message}
          onConfirm={handleOnLoginConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
    </>
  );
}

export default UsersLike;
