import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import Map from '../common/Map/Map';
import styles from './Destinations.module.scss';
import { specifiedCategoryDestinationsType } from '../../types/DestinationListTypes';
import { CiCircleAlert } from 'react-icons/ci';
import { createPortal } from 'react-dom';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

type DestinationsPropsType = {
  filteredDestinations: specifiedCategoryDestinationsType[] | [];
  isLoading: boolean;
};

function Destinations({
  filteredDestinations,
  isLoading
}: DestinationsPropsType) {
  const [slicedDestinations, setSlicedDestinations] = useState<
    specifiedCategoryDestinationsType[] | []
  >(filteredDestinations ?? []);
  const [clickedDestination, setClickedDestination] =
    useState<specifiedCategoryDestinationsType | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detailsDomRoot, setDetailsDomRoot] = useState<HTMLElement | null>(
    null
  );
  const [imageError, setImageError] = useState<boolean>(false);
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setDetailsDomRoot(() => document.getElementById('main'));
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

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={styles.destinationContentsContainer}>
      {isLoading ? (
        <div className={styles.destinationLoadingContainer}>로딩 중..</div>
      ) : (
        <div className={styles.destinationsInfoContainer}>
          <section className={styles.destinationsContainer}>
            {filteredDestinations?.length > 0 ? (
              <>
                {slicedDestinations.map(
                  (destination: specifiedCategoryDestinationsType, index) => (
                    <div
                      key={index}
                      className={styles.destinations}
                      onClick={() => handleDestinationClick(destination)}
                    >
                      <h2
                        className={
                          destination?.title.length >= 10
                            ? styles.destinationExceedTitle
                            : styles.destinationShortTitle
                        }
                      >
                        {destination?.title}
                      </h2>
                      <p className={styles.destinationAddress}>
                        {destination?.addr1}
                      </p>
                      <p className={styles.destinationCategory}>
                        {destination?.category_id}
                      </p>

                      {imageError ? (
                        <img
                          id={styles.destinationImage}
                          src={destination?.image1}
                          alt={destination.title}
                        />
                      ) : (
                        <img
                          id={styles.destinationImage}
                          src={destination?.image2}
                          alt={destination.title}
                          onError={handleImageError}
                        />
                      )}
                    </div>
                  )
                )}
                <Pagination
                  filteredDestinations={filteredDestinations}
                  setSlicedDestinations={setSlicedDestinations}
                />
              </>
            ) : (
              <div className={styles.alertContainer}>
                <CiCircleAlert className={styles.alertIcon} />
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </section>
          {isOpen &&
            detailsDomRoot !== null &&
            createPortal(
              <section className={styles.detailsContainer}>
                <Outlet />
                <div className={styles.detailsButtonContainer}>
                  <button
                    className={styles.detailsCloseButton}
                    onClick={closeDetailPage}
                  >
                    X
                  </button>
                </div>
              </section>,
              detailsDomRoot
            )}
        </div>
      )}
      <Map
        markersLocations={
          clickedDestination !== null
            ? [clickedDestination]
            : slicedDestinations
        }
        setClickedDestination={setClickedDestination}
      />
    </div>
  );
}
export default Destinations;
