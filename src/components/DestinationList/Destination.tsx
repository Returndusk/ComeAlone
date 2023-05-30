import React, { useState } from 'react';
import Map from '../common/Map';

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

function Destination() {
  const [destinations, setDestinations] = useState<DestinationsType[]>([
    ...DEFAULT_DESTINATIONS
  ]);

  return (
    <>
      <section>
        {destinations.map((destination, index) => (
          <div key={index}>
            <p>{destination.name}</p>
          </div>
        ))}
      </section>
      <Map markersLocations={destinations} />
    </>
  );
}
export default Destination;
