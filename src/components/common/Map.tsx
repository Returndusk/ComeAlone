import React, { useEffect } from 'react';
import styles from './Map.module.scss';
import { DestinationsType } from '../DestinationList/Types';

declare global {
  interface Window {
    kakao: any;
  }
}

type MapPropsType = {
  markersLocations: DestinationsType[];
};

//제주도 시청을 map의 default 위치로 설정함.
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
      const position = new kakao.maps.LatLng(marker.mapy, marker.mapx);
      const newMarker = new kakao.maps.Marker({
        title: marker.title,
        position,
        map
      });
      newMarker.setMap(map);
      bounds.extend(position);
    });
    map.setBounds(bounds);
  }, [markersLocations]);

  return (
    <>
      <div className={styles.map} id='map'></div>
    </>
  );
}

export default Map;
