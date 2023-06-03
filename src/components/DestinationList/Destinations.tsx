import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import DestinationDetails from './DestinationDetails';
import Map from '../common/Map/Map';
import styles from './Destinations.module.scss';
import { DestinationsType } from './Types';

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

  useEffect(() => {
    if (clickedDestination !== null) {
      setIsOpen(() => true);
    }
  }, [clickedDestination]);

  useEffect(() => {
    if (filteredDestinations.length === 0) {
      setIsOpen(() => false);
    }
  }, [filteredDestinations]);

  const handleDestinationClick = (destination: DestinationsType) => {
    setClickedDestination(() => destination);
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
            <div>검색 결과가 없습니다.</div>
          )}
        </section>

        {isOpen && filteredDestinations.length > 0 && (
          <section>
            <DestinationDetails
              clickedDestination={clickedDestination}
              setClickedDestination={setClickedDestination}
              setIsOpen={setIsOpen}
            />
          </section>
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
