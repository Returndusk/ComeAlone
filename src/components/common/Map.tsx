import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

type MapPropsType = {
  latitude: number;
  longitude: number;
};

const { kakao } = window;

function Map({ latitude, longitude }: MapPropsType) {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3
    };

    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <>
      <div id='map' style={{ width: '500px', height: '400px' }}></div>
    </>
  );
}

export default Map;
