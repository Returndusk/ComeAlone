import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface DestinationsType {
  name: string;
  lat: number;
  lng: number;
}

type MapPropsType = {
  markersLocations: DestinationsType[];
};

const DEFAULT_LOCATION = {
  LATITUDE: 33.48907969999994,
  LONGITUDE: 126.49932809999973
};

const { kakao } = window;

function Map({ markersLocations }: MapPropsType) {
  useEffect(() => {
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(
        DEFAULT_LOCATION.LATITUDE,
        DEFAULT_LOCATION.LONGITUDE
      ),
      level: 3
    };

    const map = new kakao.maps.Map(container, options);

    const bounds = new kakao.maps.LatLngBounds();

    markersLocations.forEach((marker) => {
      const position = new kakao.maps.LatLng(marker.lat, marker.lng);
      new kakao.maps.Marker({
        title: marker.name,
        position,
        map
      });
      bounds.extend(position);
    });
    map.setBounds(bounds);
  }, [markersLocations]);

  return (
    <>
      <div id='map' style={{ width: '500px', height: '400px' }}></div>
    </>
  );
}

export default Map;
