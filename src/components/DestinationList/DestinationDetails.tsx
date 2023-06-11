import React, { useCallback, useEffect, useState } from 'react';
import styles from './DestinationDetails.module.scss';
import Review from './Review';
import { useNavigate, useParams } from 'react-router-dom';
import { getDestinationDetailsByDestinationId } from '../../apis/destinationList';
import AlertModal from '../common/Alert/AlertModal';
import { specifiedCategoryDestinationsType } from '../../types/DestinationListTypes';
import OpenModal from './Modal/OpenModal';
import UsersLike from './UsersLike';
import { useAuthState } from '../../contexts/AuthContext';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ALERT_PROPS = {
  message: '로그인이 필요한 기능입니다.',
  showTitle: false
};

function DestinationDetails() {
  const [destinationDetails, setDestinationDetails] =
    useState<specifiedCategoryDestinationsType | null>(null);
  const { authState } = useAuthState();
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const { contentid } = useParams();
  const [isShowScheduleModal, setIsShowScheduleModal] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const getDestinationDetails = useCallback(async () => {
    const res = await getDestinationDetailsByDestinationId(Number(contentid));
    const details = res?.data;
    setDestinationDetails(() => details);
  }, [contentid]);

  useEffect(() => {
    getDestinationDetails();
  }, [getDestinationDetails]);

  const handleOnConfirm = () => {
    setIsShowAlert(false);
    navigate('/login');
  };

  const handleShowModalClick = () => {
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    setIsShowScheduleModal(true);
    return;
  };

  return (
    <>
      {destinationDetails !== null && (
        <div className={styles.destinationDetailsContainer}>
          <section className={styles.destinationDetails}>
            <div>
              <img
                id={styles.destinationDetailsImage}
                src={destinationDetails.image1}
                alt={destinationDetails.title}
              />
            </div>
            <h2 className={styles.destinationDetailsTitle}>
              {destinationDetails?.title}
            </h2>
            <div className={styles.destinationDetailsLikes}>
              <UsersLike destinationDetails={destinationDetails} />
            </div>
            <span className={styles.destinationAddrContainer}>
              <FaMapMarkerAlt id={styles.destinationAddrIcon} />
              <p className={styles.destinationAddress}>
                {`${destinationDetails?.addr1} ${destinationDetails?.addr2}`}
              </p>
            </span>

            <span className={styles.destinationTelContainer}>
              <BsFillTelephoneFill id={styles.destinationTelIcon} />
              <p className={styles.destinationTelNumber}>
                {destinationDetails?.tel
                  ? destinationDetails?.tel
                  : '정보가 제공되고 있지 않습니다.'}{' '}
              </p>
            </span>

            <div className={styles.destinationOverview}>
              {destinationDetails?.overview}
            </div>

            <div className={styles.scheduleModalButtonContainer}>
              <button
                id={styles.scheduleModalButton}
                onClick={handleShowModalClick}
              >
                내 일정에 추가
              </button>
            </div>
          </section>
          <section className={styles.detailsReviewsContainer}>
            <Review />
          </section>
        </div>
      )}
      {isShowScheduleModal && (
        <OpenModal closeModal={() => setIsShowScheduleModal(false)} />
      )}
      {isShowAlert && (
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
