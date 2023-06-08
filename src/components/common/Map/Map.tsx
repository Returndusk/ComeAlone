import React, { useEffect, useMemo, useState } from 'react';
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
  const [renderedMap, setRenderedMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any>(null);

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
    setRenderedMap(() => map);
  }, []);

  useEffect(() => {
    if (renderedMap === null) {
      return;
    } else {
      const positions = markersLocations?.map(
        (marker) =>
          new kakao.maps.LatLng(Number(marker?.mapy), Number(marker?.mapx))
      );
      if (markers !== null) {
        const removeMarkers = markers.map((marker: any) => marker.setMap(null));
        setMarkers(removeMarkers);
      }
      const newMarkers = positions.map(
        (position) =>
          new kakao.maps.Marker({
            position,
            map: renderedMap
          })
      );

      setMarkers(newMarkers);

      if (positions.length > 0) {
        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );
        renderedMap?.setBounds(bounds, 36, 32, 32, 650);
      }

      // markers.setMap(renderedMap);
      // bounds.extend(position);

      // markers.map((marker: any) => {
      //   kakao.maps.event.addListener(marker, 'click', function () {
      //     setClickedDestination(marker);
      //   });
      // });
    }
  }, [markersLocations]);

  return (
    <>
      <div className={styles.map} id='map'></div>
    </>
  );
}

export default Map;
