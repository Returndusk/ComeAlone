import React, { useEffect, useMemo } from 'react';
import styles from './Map.module.scss';
import { MapPropsType } from '../../../types/DestinationListTypes';

declare global {
  interface Window {
    kakao: any;
  }
}

type MapPropsTypes = {
  markersLocations: MapPropsType[];
  setClickedDestination: React.Dispatch<
    React.SetStateAction<MapPropsType | null>
  >;
};

//제주도 시청을 map의 default 위치로 설정함.
const DEFAULT_LOCATION = {
  LATITUDE: 33.48907969999994,
  LONGITUDE: 126.49932809999973
};

const { kakao } = window;

function Map({ markersLocations, setClickedDestination }: MapPropsTypes) {
  const cachingMarkers = useMemo(() => {
    return markersLocations;
  }, [markersLocations]);

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

    cachingMarkers?.forEach((marker) => {
      const position = new kakao.maps.LatLng(
        Number(marker?.mapy),
        Number(marker?.mapx)
      );
      const newMarker = new kakao.maps.Marker({
        title: marker.title,
        position,
        map
      });
      newMarker.setMap(map);
      bounds.extend(position);
      map.setBounds(bounds, 36, 32, 32, 650);

      kakao.maps.event.addListener(newMarker, 'click', function () {
        setClickedDestination(marker);
      });
    });
  }, [cachingMarkers]);

  return (
    <>
      <div className={styles.map} id='map'></div>
    </>
  );
}

export default Map;
