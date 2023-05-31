import React, { useState } from 'react';
import Pagination from './Pagination';
import DestinationDetails from './DestinationDetails';
import Map from '../common/Map';
import styles from './Destinations.module.scss';
import MapWithWaypoints from '../common/MapWithWaypoints';
import { DestinationsType } from './Types';

//Dummy data
const DEFAULT_DESTINATIONS = [
  { title: '제주도 시청', mapy: 33.48907969999994, mapx: 126.49932809999973 },
  {
    title: '한라산',
    mapy: 33.37915262371278,
    mapx: 126.54626368383182,
    tel: '064-772-3366',
    overview: '개요 설명입니다.'
  },
  {
    title: '서귀포 해양 도립공원',
    mapy: 33.241570451808215,
    mapx: 126.55770550692283
  },
  { title: '금오름', mapy: 33.35452764241429, mapx: 126.30590904987518 }
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
            <p>{destination?.title}</p>
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

      <Map
        markersLocations={
          clickedDestination !== null ? [clickedDestination] : destinations
        }
      />

      <MapWithWaypoints markersLocations={destinations} />
    </>
  );
}
export default Destinations;
