import React, { useCallback, useEffect, useState } from 'react';
import styles from './UsersLike.module.scss';
import { postPreferredDestinationsByDestinationId } from '../../apis/destinationList';
import { useNavigate, useParams } from 'react-router-dom';
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

function UsersLike({ destinationDetails }: UsersLikePropsType) {
  const [isUserLike, setIsUserLike] = useState<boolean>(false);
  const { authState } = useAuthState();
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const { contentid } = useParams();
  const navigate = useNavigate();

  const getUsersPreferData = useCallback(() => {
    const usersId = authState?.user?.id;
    const preferUserList = destinationDetails?.destination_likes ?? [];
    const accessUserPreferInfo = preferUserList.find(
      (user) => user.user_id === usersId
    );
    setIsUserLike(() => accessUserPreferInfo?.is_liked ?? false);
  }, [setIsUserLike, destinationDetails]);

  useEffect(() => {
    getUsersPreferData();
  }, [getUsersPreferData]);

  const postUsersPreferData = useCallback(
    async (destinationId: number) => {
      const res = await postPreferredDestinationsByDestinationId(destinationId);
      const usersPreferData = res?.data.is_liked;
      setIsUserLike(() => usersPreferData);
    },
    [setIsUserLike]
  );

  const handleLikeClick = async () => {
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    setIsUserLike(() => !destinationDetails?.destination_likes);
    await postUsersPreferData(Number(contentid));
    return;
  };

  const handleOnLoginConfirm = () => {
    setIsShowAlert(false);
    navigate('/login');
  };

  return (
    <>
      <div className={styles.usersLikesbox}>
        <button className={styles.likesButton} onClick={handleLikeClick}>
          {isUserLike ? (
            <FaHeart id={styles.likesIcon} />
          ) : (
            <FaRegHeart id={styles.canceledLikesIcon} />
          )}
        </button>
        <span id={styles.likesLabel}>좋아요</span>
      </div>
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
