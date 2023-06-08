import React, { useCallback, useEffect, useState } from 'react';
import styles from './DestinationDetails.module.scss';
import { RiThumbUpFill } from 'react-icons/ri';
import { RiThumbUpLine } from 'react-icons/ri';
import Review from './Review';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getDestinationDetailsByDestinationId,
  postPreferredDestinationsByDestinationId
} from '../../apis/destinationList';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';
import Accordian from './Accordian';
import { DestinationsDetailsType } from '../../types/DestinationListTypes';

const ALERT_PROPS = {
  message: '로그인이 필요한 기능입니다.',
  showTitle: false
};

function DestinationDetails() {
  const [destinationDetails, setDestinationDetails] =
    useState<DestinationsDetailsType | null>(null);
  const { authState, updateAuthState } = useAuthState();
  const [likes, setLikes] = useState<boolean>(false);
  const { contentid } = useParams();
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const getDestinationDetails = useCallback(async () => {
    const res = await getDestinationDetailsByDestinationId(Number(contentid));
    const details = res?.data;
    setDestinationDetails(() => details);
  }, [contentid]);

  useEffect(() => {
    getDestinationDetails();
  }, [getDestinationDetails]);

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
    } else {
      setIsOpenAlert(true);
    }
  };

  useEffect(() => {
    console.log(likes);
  }, [likes]);

  const handleOnConfirm = () => {
    setIsOpenAlert(false);
    navigate('/login');
  };

  return (
    <>
      {destinationDetails !== null && (
        <div className={styles.destinationDetailsContainer}>
          <section className={styles.destinationDetails}>
            <div>
              <img
                id={styles.destinationDetailsImage}
                src={destinationDetails.image2}
                alt={destinationDetails.title}
              />
            </div>
            <h2>{destinationDetails?.title}</h2>
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
            <p>전화번호:{destinationDetails?.tel}</p>
            <Accordian>{destinationDetails?.overview}</Accordian>

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
          onConfirm={handleOnConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
    </>
  );
}

export default DestinationDetails;
