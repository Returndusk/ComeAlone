import React, { useEffect, useMemo, useState } from 'react';
import Pagination from './Pagination';
import DestinationDetails from './DestinationDetails';
import Map from '../common/Map/Map';
import styles from './Destinations.module.scss';
import { DestinationsType } from './Types';
import { CiCircleAlert } from 'react-icons/ci';
import { createPortal } from 'react-dom';

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
  const DETAILS_DOM_ROOT = useMemo(() => {
    return document.getElementById('main');
  }, [isOpen]);

  useEffect(() => {
    if (clickedDestination !== null) {
      setIsOpen(() => true);
    }
  }, [clickedDestination]);

  useEffect(() => {
    if (filteredDestinations.length === 0) {
      setIsOpen(() => false);
      return;
    }
    setIsOpen(() => false);
  }, [filteredDestinations]);

  const handleDestinationClick = (destination: DestinationsType) => {
    setClickedDestination(() => destination);
  };
  console.log(isOpen);
  console.log(DETAILS_DOM_ROOT);
  console.log(DETAILS_DOM_ROOT);

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
                    <h2>{destination?.title}</h2>
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
          DETAILS_DOM_ROOT !== null &&
          createPortal(
            <section>
              <DestinationDetails
                clickedDestination={clickedDestination}
                setClickedDestination={setClickedDestination}
                setIsOpen={setIsOpen}
              />
            </section>,
            DETAILS_DOM_ROOT
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
