import React, { useEffect } from 'react';
import styles from './MapWithWaypoints.module.scss';
import { MapWithWaypointsPropsType } from '../../../types/DestinationListTypes';

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LOCATION = {
  LATITUDE: 33.37930616373528,
  LONGITUDE: 126.5986957523883
};

const MARKER_IMAGE_SRC = {
  MAXIMUM_INDEX: 14,
  NUMBERED_MARKER: `https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png`,
  DEFAULT_MARKER: `http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png`
};

const { kakao } = window;

function MapWithWaypoints({
  markersLocations
}: {
  markersLocations: MapWithWaypointsPropsType[];
}) {
  useEffect(() => {
    const container = document.getElementById('mapWithWaypoints');
    const options = {
      center: new kakao.maps.LatLng(
        DEFAULT_LOCATION.LATITUDE,
        DEFAULT_LOCATION.LONGITUDE
      ),
      level: 10
    };
    const map = new kakao.maps.Map(container, options);

    if (Array.isArray(markersLocations) && markersLocations.length > 0) {
      const bounds = new kakao.maps.LatLngBounds();
      const polylinePath = Array.from(
        markersLocations.map(
          (marker) =>
            new kakao.maps.LatLng(Number(marker?.mapy), Number(marker?.mapx))
        )
      );
      const polyline = new kakao.maps.Polyline({
        path: polylinePath,
        strokeWeight: 3,
        strokeColor: '#654E92',
        strokeOpacity: 0.7,
        strokeStyle: 'solid'
      });

      polyline.setMap(map);

      markersLocations.forEach((marker, index) => {
        const position = new kakao.maps.LatLng(
          Number(marker?.mapy),
          Number(marker?.mapx)
        );
        let imageSrc = '';
        if (index <= MARKER_IMAGE_SRC.MAXIMUM_INDEX) {
          imageSrc = MARKER_IMAGE_SRC.NUMBERED_MARKER;
        } else {
          imageSrc = MARKER_IMAGE_SRC.DEFAULT_MARKER;
        }

        //Marker 이미지 파일 크기 설정
        const imageSize = new kakao.maps.Size(36, 37);
        const imageOptions = {
          spriteSize: new kakao.maps.Size(36, 691),
          spriteOrigin: new kakao.maps.Point(0, index * 46 + 10),
          offset: new kakao.maps.Point(13, 37)
        };
        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOptions
        );
        const newMarker = new kakao.maps.Marker({
          title: marker.title,
          position,
          image: markerImage
        });

        newMarker.setMap(map);

        bounds.extend(position);

        map.setBounds(bounds);
      });
    }
  }, [markersLocations]);

  return <div className={styles.mapWithWaypoints} id='mapWithWaypoints'></div>;
}

export default MapWithWaypoints;
