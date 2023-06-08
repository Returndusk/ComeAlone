import React, { useCallback, useEffect, useState } from 'react';
import Pagination from './Pagination';
import Map from '../common/Map/Map';
import styles from './Destinations.module.scss';
import { DestinationsType } from '../../types/DestinationListTypes';
import { CiCircleAlert } from 'react-icons/ci';
import { createPortal } from 'react-dom';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

type DestinationsPropsType = {
  filteredDestinations: DestinationsType[] | [];
  // isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

//해야할거: 랭킹 데이터, 서치데이터, 카테고리 데이터 랭킹 규정하기
function Destinations({
  filteredDestinations
}: // isLoading,
// setIsLoading
DestinationsPropsType) {
  const [slicedDestinations, setSlicedDestinations] = useState<
    DestinationsType[] | []
  >(filteredDestinations);
  const [clickedDestination, setClickedDestination] =
    useState<DestinationsType | null>(null);
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

  const handleDestinationClick = (destination: DestinationsType) => {
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
      {/* {isLoading ? (
        <div>로딩 중..</div>
      ) : ( */}
      <div className={styles.destinationsInfoContainer}>
        <section className={styles.destinationsContainer}>
          {filteredDestinations.length > 0 ? (
            <>
              {slicedDestinations.map(
                (destination: DestinationsType, index) => (
                  <div
                    key={index}
                    className={styles.destinations}
                    onClick={() => handleDestinationClick(destination)}
                  >
                    <h3>{destination?.title}</h3>
                    <p>{destination?.addr1}</p>
                    <p>{destination?.category_id}</p>

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
      {/* )} */}
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
