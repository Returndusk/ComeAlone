import React, { useCallback, useEffect, useState } from 'react';
import styles from './DestinationDetails.module.scss';
import Review from './Review';
import { useNavigate, useParams } from 'react-router-dom';
import { getDestinationDetailsByDestinationId } from '../../apis/destinationList';
import AlertModal from '../common/Alert/AlertModal';
import Accordian from './Accordian';
import { DestinationsDetailsType } from '../../types/DestinationListTypes';
import OpenModal from './Modal/OpenModal';

const ALERT_PROPS = {
  message: '로그인이 필요한 기능입니다.',
  showTitle: false
};

function DestinationDetails() {
  const [destinationDetails, setDestinationDetails] =
    useState<DestinationsDetailsType | null>(null);

  const { contentid } = useParams();
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
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
    setIsOpenAlert(false);
    navigate('/login');
  };

  const handleShowModalClick = () => {
    setIsShowScheduleModal(true);
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

            <p>전화번호:{destinationDetails?.tel}</p>
            <Accordian>{destinationDetails?.overview}</Accordian>

            <div className={styles.scheduleModalButtonContainer}>
              <button onClick={handleShowModalClick}>내 일정에 추가</button>
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
