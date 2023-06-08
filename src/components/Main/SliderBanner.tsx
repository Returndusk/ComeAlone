/*  슬라이더 옵션
autoplay: true,  // 자동재생
autoplaySpeed: 3000, // 간격시간
dots: false, // 동그라미버튼
speed: 600, // 바뀌는시간(생략가능)
slidesToShow: 3, // 보여질슬라이드수(생략가능)
slidesToScroll: 1, // 이동슬라이드수(생략가능)
pauseOnHover: true, // 마우스오버시 멈춤여부(생략가능)
pauseOnDotsHover: true, // 동그라미번호버튼에 호버시 멈춤여부(생략가능)
pauseOnFocus: false,  // 동그라미번호버튼 클릭시 자동실행 멈춤여부
cssEase: 'linear', // 속도함수(생략가능)
draggable: true, // 마우스드래그시 슬라이드 교체가능여부(생략가능)
fade: false, // 슬라이드가 수평으로 이동하지 않고, 제자리에서 사라지고 나타남(생략가능)
arrows: true, // 좌우화살표 사용여부(생략가능)
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SliderBanner.module.scss';
import {
  SliderComponentProps,
  Destination
} from '../../types/SliderBannerTypes';

function SliderBanner({
  settings,
  api,
  urlTemplate
}: SliderComponentProps): JSX.Element {
  const defaultSettings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000
  };

  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get<Destination[]>(api);
        setDestinations(res.data);
      } catch (error) {
        console.error('Failed to fetch destinations', error);
      }
    };
    fetchDestinations();
  }, [api]);

  const finalSettings = { ...defaultSettings, ...settings };

  const handleBannerClick = (data: Destination): void => {
    if (urlTemplate) {
      let url;
      if (
        Object.prototype.hasOwnProperty.call(data, 'id') &&
        typeof data.id !== 'undefined'
      ) {
        url = urlTemplate
          .replace('{id}', data.id.toString())
          .replace('{title}', encodeURIComponent(data.title));
      } else if (
        Object.prototype.hasOwnProperty.call(data, 'schedule_id') &&
        typeof data.schedule_id !== 'undefined'
      ) {
        url = urlTemplate
          .replace('{schedule_id}', data.schedule_id.toString())
          .replace('{title}', encodeURIComponent(data.title));
      }
      if (url) {
        window.location.href = url;
      }
    }
  };

  return (
    <div className={styles.container}>
      <Slider {...finalSettings}>
        {destinations.map((destination, index) => (
          <div
            key={`destination-${
              destination.id || destination.schedule_id || index
            }`}
            className={styles.box}
            onClick={() => handleBannerClick(destination)}
          >
            <div className={styles.imageContainer}>
              <img
                src={
                  destination.image1 ||
                  'https://image.utoimage.com/preview/cp872655/2021/05/202105029544_500.jpg'
                }
                alt={destination.title}
              />
              <div className={styles.text}>
                <h3>{destination.title}</h3>
                <p>
                  {destination.overview && destination.overview.length > 20
                    ? destination.overview.slice(0, 62) + '...'
                    : destination.overview}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderBanner;
