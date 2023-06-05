import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import Map from '../common/Map/Map';
import styles from './Destinations.module.scss';
import { DestinationsType } from '../../types/DestinationListTypes';
import { CiCircleAlert } from 'react-icons/ci';
import { createPortal } from 'react-dom';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

type DestinationsPropsType = {
  filteredDestinations: DestinationsType[] | [];
};

function Destinations({ filteredDestinations }: DestinationsPropsType) {
  const [slicedDestinations, setSlicedDestinations] = useState<
    DestinationsType[] | []
  >(filteredDestinations);
  const [clickedDestination, setClickedDestination] =
    useState<DestinationsType | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detailsDomRoot, setDetailsDomRoot] = useState<HTMLElement | null>(
    null
  );
  const { search } = useLocation();
  const navigate = useNavigate();

  console.log(filteredDestinations, '데스티네이션 filteredDestinations');

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

  return (
    <div className={styles.destinationContentsContainer}>
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
      <Map
        markersLocations={
          clickedDestination !== null
            ? [clickedDestination]
            : filteredDestinations
        }
        setClickedDestination={setClickedDestination}
      />
    </div>
  );
}
export default Destinations;
