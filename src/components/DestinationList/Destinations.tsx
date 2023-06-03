import React, { useState } from 'react';
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
                    <p>{destination?.title}</p>
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

        <section>
          <DestinationDetails
            clickedDestination={clickedDestination}
            setClickedDestination={setClickedDestination}
          />
        </section>
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
