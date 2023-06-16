import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import Map from '../common/Map/Map';
import styles from './Destinations.module.scss';
import { specifiedCategoryDestinationsType } from '../../types/DestinationListTypes';
import { CiCircleAlert } from 'react-icons/ci';
import { createPortal } from 'react-dom';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaHeart, FaCommentAlt } from 'react-icons/fa';
import { TfiClose } from 'react-icons/tfi';

type DestinationsPropsType = {
  filteredDestinations: specifiedCategoryDestinationsType[] | [];
  isTotalDataNone: boolean;
};

const DESTINATION_TITLE_STATUS = {
  MAXIMUN_LENGTH: 14
};

function Destinations({
  filteredDestinations,
  isTotalDataNone
}: DestinationsPropsType) {
  const [slicedDestinations, setSlicedDestinations] = useState<
    specifiedCategoryDestinationsType[] | []
  >(filteredDestinations);
  const [clickedDestination, setClickedDestination] =
    useState<specifiedCategoryDestinationsType | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detailsDomRoot, setDetailsDomRoot] = useState<HTMLElement | null>(
    null
  );
  const [mapDomRoot, setMapDomRoot] = useState<HTMLElement | null>(null);
  const { search } = useLocation();
  const navigate = useNavigate();
  const { contentid } = useParams();

  //contentid가 url에 있으면, 상세페이지가 열리도록 하기
  useEffect(() => {
    if (contentid) {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  }, [contentid, setIsOpen]);

  useEffect(() => {
    setDetailsDomRoot(() => document.getElementById('main'));
    setMapDomRoot(() => document.getElementById('main'));
  }, []);

  const handleDestinationClick = (
    destination: specifiedCategoryDestinationsType
  ) => {
    setClickedDestination(() => destination);
    navigate(`/destination/list/${destination.id}${search}`);
    setIsOpen(() => true);
  };

  const closeDetailPage = () => {
    setIsOpen(() => false);
    setClickedDestination(() => null);
    navigate(`/destination/list${search}`);
  };

  return (
    <div className={styles.destinationContentsContainer}>
      <section className={styles.destinationsContainer}>
        {filteredDestinations?.length > 0 ? (
          <>
            {slicedDestinations.map(
              (destination: specifiedCategoryDestinationsType, index) => (
                <div
                  key={index}
                  className={styles.destinations}
                  id={
                    clickedDestination?.id === destination.id
                      ? styles.clickedDestination
                      : styles.restDestination
                  }
                  onClick={() => handleDestinationClick(destination)}
                >
                  <div className={styles.destinationTextWrapper}>
                    <h2
                      className={styles.destinationTitle}
                      id={
                        destination?.title.length >=
                        DESTINATION_TITLE_STATUS.MAXIMUN_LENGTH
                          ? styles.destinationTitleExtended
                          : styles.destinationTitle
                      }
                    >
                      {destination?.title}
                    </h2>
                    <p className={styles.destinationAddress}>
                      {destination?.addr1}
                    </p>
                    <div className={styles.destinationExtraInfo}>
                      <span className={styles.destinationCategory}>
                        {destination?.category_name}
                      </span>
                      <div className={styles.iconContainer}>
                        <div className={styles.likeBox}>
                          <FaHeart />
                          <span className={styles.likesCounter}>
                            {destination?.destination_likes_count}
                          </span>
                        </div>
                        <div className={styles.commentBox}>
                          <FaCommentAlt />
                          <span className={styles.commentCounter}>
                            {destination?.comment_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {destination?.image1 && (
                    <img
                      className={styles.destinationImage}
                      src={destination?.image2}
                      alt={destination.title}
                    />
                  )}
                </div>
              )
            )}
          </>
        ) : (
          isTotalDataNone && (
            <div className={styles.alertContainer}>
              <CiCircleAlert className={styles.alertIcon} />
              <p>검색 결과가 없습니다.</p>
            </div>
          )
        )}
      </section>

      {Array.isArray(filteredDestinations) &&
        filteredDestinations?.length > 0 && (
          <Pagination
            filteredDestinations={filteredDestinations}
            setSlicedDestinations={setSlicedDestinations}
          />
        )}
      {isOpen &&
        detailsDomRoot !== null &&
        createPortal(
          <>
            <section className={styles.detailsContainer}>
              <Outlet />
            </section>
            <div className={styles.detailsButtonContainer}>
              <button
                className={styles.detailsCloseButton}
                onClick={closeDetailPage}
              >
                <TfiClose />
              </button>
            </div>
          </>,
          detailsDomRoot
        )}

      {mapDomRoot !== null &&
        createPortal(
          <Map
            markersLocations={
              clickedDestination !== null
                ? [clickedDestination]
                : slicedDestinations
            }
            setClickedDestination={setClickedDestination}
          />,
          mapDomRoot
        )}
    </div>
  );
}
export default Destinations;
