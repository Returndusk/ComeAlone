import React, { useEffect, useState } from 'react';
import styles from './Map.module.scss';
import { specifiedCategoryDestinationsType } from '../../../types/DestinationListTypes';
import { useLocation, useNavigate } from 'react-router-dom';

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

const NULL_DATA = {
  TITLE: '금능포구',
  MAPX: 126.22823779107965,
  MAPY: 33.390051648123254
};

const { kakao } = window;

function Map({ markersLocations, setClickedDestination }: MapPropsTypes) {
  const [renderedMap, setRenderedMap] = useState<kakao.maps.Map | null>(null);
  const [markers, setMarkers] = useState<kakao.maps.Marker[] | null>(null);
  const navigate = useNavigate();
  const { search } = useLocation();

  const setLocationToNullData = (
    location: specifiedCategoryDestinationsType
  ) => {
    if (location?.title === NULL_DATA.TITLE) {
      const newLocationData: specifiedCategoryDestinationsType = {
        ...location
      };
      newLocationData['mapx'] = String(NULL_DATA.MAPX);
      newLocationData['mapy'] = String(NULL_DATA.MAPY);
      return newLocationData;
    }
    return location;
  };

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
      const positions = markersLocations?.map((marker) => {
        const InspectedMarker = setLocationToNullData(marker);
        return {
          title: InspectedMarker.title,
          content: `<p>${InspectedMarker.title}</p>`,
          latlng: new kakao.maps.LatLng(
            Number(InspectedMarker?.mapy),
            Number(InspectedMarker?.mapx)
          )
        };
      });
      if (markers) {
        markers.forEach((marker: kakao.maps.Marker) => marker.setMap(null));
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

      //이벤트 등록
      for (let i = 0; i < positions.length; i++) {
        kakao.maps.event.addListener(newMarkers[i], 'click', function () {
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
