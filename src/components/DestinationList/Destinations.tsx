import React, { useState } from 'react';
import Pagination from './Pagination';
import DestinationDetails from './DestinationDetails';
import Map from '../common/Map';
import styles from './Destinations.module.scss';

interface DestinationsType {
  name: string;
  lat: number;
  lng: number;
}

//Dummy data
const DEFAULT_DESTINATIONS = [
  { name: '제주도 시청', lat: 33.48907969999994, lng: 126.49932809999973 },
  { name: '한라산', lat: 33.37915262371278, lng: 126.54626368383182 },
  {
    name: '서귀포 해양 도립공원',
    lat: 33.241570451808215,
    lng: 126.55770550692283
  }
];

function Destinations() {
  const [destinations, setDestinations] = useState<DestinationsType[]>([
    ...DEFAULT_DESTINATIONS
  ]);
  const [slicedDestinations, setSlicedDestinations] = useState<
    DestinationsType[]
  >([...DEFAULT_DESTINATIONS]);
  const [clickedDestination, setClickedDestination] =
    useState<DestinationsType | null>(null);

  const handleDestinationClick = (destination: DestinationsType) => {
    setClickedDestination(() => destination);
  };

  return (
    <>
      <section className={styles.destinationsContainer}>
        {slicedDestinations.map((destination: DestinationsType, index) => (
          <div key={index} onClick={() => handleDestinationClick(destination)}>
            <p>{destination.name}</p>
          </div>
        ))}

        <Pagination
          destinations={destinations}
          setSlicedDestinations={setSlicedDestinations}
        />
      </section>
      <DestinationDetails
        clickedDestination={clickedDestination}
        setClickedDestination={setClickedDestination}
      />
      <Map markersLocations={destinations} />
    </>
  );
}
export default Destinations;
