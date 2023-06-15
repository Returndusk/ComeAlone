import React, { useEffect, useState } from 'react';
import styles from './Map.module.scss';
import { specifiedCategoryDestinationsType } from '../../../types/DestinationListTypes';
import { useLocation, useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    kakao: any;
  }
}

type MapPropsTypes = {
  markersLocations: specifiedCategoryDestinationsType[];
  setClickedDestination: React.Dispatch<
    React.SetStateAction<specifiedCategoryDestinationsType | null>
  >;
};

const DEFAULT_LOCATION = {
  LATITUDE: 32.412348163024674,
  LONGITUDE: 126.94951514124065
};

const { kakao } = window;

function Map({ markersLocations, setClickedDestination }: MapPropsTypes) {
  const [renderedMap, setRenderedMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const navigate = useNavigate();
  const { search } = useLocation();

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
      const positions = markersLocations?.map((marker) => ({
        title: marker.title,
        content: `<p>${marker.title}</p>`,
        latlng: new kakao.maps.LatLng(
          Number(marker?.mapy),
          Number(marker?.mapx)
        )
      }));
      if (markers !== null) {
        const removeMarkers = markers.map((marker: any) => marker.setMap(null));
        setMarkers(removeMarkers);
      }
      const newMarkers = positions.map(
        (position) =>
          new kakao.maps.Marker({
            title: position.title,
            position: position.latlng,
            map: renderedMap
          })
      );

      setMarkers(newMarkers);

      if (positions.length > 0) {
        const bounds = positions.reduce(
          (bounds, position) => bounds.extend(position.latlng),
          new kakao.maps.LatLngBounds()
        );
        renderedMap?.setBounds(bounds, 36, 32, 32, 800);
      }

      for (let i = 0; i < positions.length; i++) {
        const customOverlay = new kakao.maps.CustomOverlay({
          position: positions[i].latlng,
          content: positions[i].content
        });

        // let isClicked = false;
        kakao.maps.event.addListener(newMarkers[i], 'click', function () {
          // isClicked = true;
          // setIsClicked(true);
          console.log(isClicked, '클릭');

          const markersTitle = newMarkers[i].getTitle();

          const targetMarker = markersLocations.find(
            (pos) => pos.title === markersTitle
          );

          if (targetMarker) {
            setClickedDestination(() => targetMarker);
            navigate(`/destination/list/${targetMarker.id}${search}`);
          }

          return;
        });

        // kakao.maps.event.addListener(newMarkers[i], 'mouseover', function () {
        //   console.log(isClicked, '마우스오버 1');
        //   if (isClicked) {
        //     return;
        //   }
        //   customOverlay.setMap(renderedMap);
        // });

        // kakao.maps.event.addListener(newMarkers[i], 'mouseout', function () {
        //   console.log(isClicked, '마우스아웃');
        //   if (isClicked) {
        //     return;
        //   }
        //   setTimeout(function () {
        //     customOverlay.setMap(null);
        //     // isClicked = false;
        //     setIsClicked(false);
        //   }, 100);

        //   // customOverlay.setMap(null);
        // });
      }
    }
  }, [markersLocations, renderedMap, setClickedDestination, search]);

  return (
    <>
      <div className={styles.map} id='map'></div>
    </>
  );
}

export default Map;
