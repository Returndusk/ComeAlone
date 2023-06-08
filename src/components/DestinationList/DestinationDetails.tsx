import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './DestinationDetails.module.scss';
import { RiThumbUpFill } from 'react-icons/ri';
import { RiThumbUpLine } from 'react-icons/ri';
import Review from './Review';
import { useParams } from 'react-router-dom';
import { DEFAULT_DESTINATIONS } from './Dummy';
import { postPreferredDestinationsByDestinationId } from '../../apis/destinationList';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';

const ALERT_PROPS = {
  message: '로그인이 필요한 기능입니다.',
  showTitle: false
};

function DestinationDetails() {
  const { authState, updateAuthState } = useAuthState();
  const [likes, setLikes] = useState<boolean>(false);
  const { contentid } = useParams();
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);

  const destination = useMemo(() => {
    return DEFAULT_DESTINATIONS.find((des) => des.id === Number(contentid));
  }, [contentid]);

  const postLikesDestinations = useCallback(async () => {
    const res = await postPreferredDestinationsByDestinationId(
      Number(contentid)
    );
    const userLikes = res?.data.is_liked;
    setLikes(() => userLikes);
  }, []);

  const handleLikesClick = () => {
    if (authState.isLoggedIn) {
      postLikesDestinations();
      console.log(likes);
    } else {
      setIsOpenAlert(true);
    }
  };

  return (
    <>
      {destination !== null && (
        <div className={styles.destinationDetailsContainer}>
          <section className={styles.destinationDetails}>
            <h2>{destination?.title}</h2>
            <p>전화번호:{destination?.tel}</p>
            <div>{destination?.overview}</div>

            <button
              className={styles.detailsLikesButton}
              onClick={handleLikesClick}
            >
              {likes ? (
                <RiThumbUpFill className={styles.detailsLikesUpButton} />
              ) : (
                <RiThumbUpLine className={styles.detailsLikesCancelButton} />
              )}
            </button>
            <div>{/*<button>내 일정에 추가</button>*/}</div>
          </section>
          <section className={styles.detailsReviewsContainer}>
            <Review />
          </section>
        </div>
      )}
      {isOpenAlert && (
        <AlertModal
          message={ALERT_PROPS.message}
          onConfirm={() => setIsOpenAlert(false)}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
    </>
  );
}

export default DestinationDetails;
