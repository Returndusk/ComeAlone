import React, { useState } from 'react';
import Map from '../common/Map';

type location = number;

const DEFAULT_LOCATION = {
  LATITUDE: 33.48907969999994,
  LONGITUDE: 126.49932809999973
};

function Destination() {
  const [latitude, setLatitude] = useState<location>(DEFAULT_LOCATION.LATITUDE);
  const [longitude, setLongitude] = useState<location>(
    DEFAULT_LOCATION.LONGITUDE
  );

  return (
    <>
      <Map latitude={latitude} longitude={longitude} />
    </>
  );
}
export default Destination;
