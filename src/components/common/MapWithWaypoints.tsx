import React, { useEffect } from 'react';
import styles from './MapWithWaypoints.module.scss';

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

// 제주도 시청을 map의 default 위치로 설정함.
const DEFAULT_LOCATION = {
  LATITUDE: 33.48907969999994,
  LONGITUDE: 126.49932809999973
};

const { kakao } = window;

function MapWithWaypoints({ markersLocations }: MapPropsType) {
  useEffect(() => {
    const container = document.getElementById('mapWithWaypoints');

    const options = {
      center: new kakao.maps.LatLng(
        DEFAULT_LOCATION.LATITUDE,
        DEFAULT_LOCATION.LONGITUDE
      ),
      level: 3
    };

    const map = new kakao.maps.Map(container, options);

    const bounds = new kakao.maps.LatLngBounds();
    const polylinePath = Array.from(
      markersLocations.map(
        (marker) => new kakao.maps.LatLng(marker.lat, marker.lng)
      )
    );
    console.log(polylinePath);

    const polyline = new kakao.maps.Polyline({
      path: polylinePath,
      strokeWeight: 3,
      strokeColor: '#FF0000',
      strokeOpacity: 0.7,
      strokeStyle: 'solid'
    });

    polyline.setMap(map);

    markersLocations.forEach((marker) => {
      const position = new kakao.maps.LatLng(marker.lat, marker.lng);
      const newMarker = new kakao.maps.Marker({
        title: marker.name,
        position
      });
      newMarker.setMap(map);
      bounds.extend(position);
    });

    map.setBounds(bounds);
  }, [markersLocations]);

  return <div className={styles.mapWithWaypoints} id='mapWithWaypoints'></div>;
}

export default MapWithWaypoints;
