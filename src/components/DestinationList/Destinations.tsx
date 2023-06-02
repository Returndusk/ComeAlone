import React, { useState } from 'react';
import Pagination from './Pagination';
import DestinationDetails from './DestinationDetails';
import Map from '../common/Map';
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

  const handleDestinationClick = (destination: DestinationsType) => {
    setClickedDestination(() => destination);
  };

  return (
    <div className={styles.destinationContentsContainer}>
      <section className={styles.destinationsContainer}>
        {slicedDestinations.length > 0 ? (
          slicedDestinations.map((destination: DestinationsType, index) => (
            <div
              key={index}
              className={styles.destinations}
              onClick={() => handleDestinationClick(destination)}
            >
              <p>{destination?.title}</p>
            </div>
          ))
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}

        <Pagination
          destinations={filteredDestinations}
          setSlicedDestinations={setSlicedDestinations}
        />
      </section>
      <DestinationDetails
        clickedDestination={clickedDestination}
        setClickedDestination={setClickedDestination}
      />
      <Map
        markersLocations={
          clickedDestination !== null
            ? [clickedDestination]
            : filteredDestinations
        }
      />
    </div>
  );
}
export default Destinations;
