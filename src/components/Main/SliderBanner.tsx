/*  슬라이더 옵션
autoplay: true,  // 자동재생
autoplaySpeed: 3000, // 간격시간
dots: false, // 동그라미버튼
speed: 600, // 바뀌는시간(생략가능)
slidesToShow: 3, // 보여질슬라이드수(생략가능)
centerMode: true,
centerPadding: "80px",
slidesToScroll: 1, // 이동슬라이드수(생략가능)
pauseOnHover: true, // 마우스오버시 멈춤여부(생략가능)
pauseOnDotsHover: true, // 동그라미번호버튼에 호버시 멈춤여부(생략가능)
pauseOnFocus: false,  // 동그라미번호버튼 클릭시 자동실행 멈춤여부
cssEase: 'linear', // 속도함수(생략가능)
draggable: true, // 마우스드래그시 슬라이드 교체가능여부(생략가능)
fade: false, // 슬라이드가 수평으로 이동하지 않고, 제자리에서 사라지고 나타남(생략가능)
arrows: true, // 좌우화살표 사용여부(생략가능)
*/

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SliderBanner.module.scss';

interface SliderComponentProps {
  settings?: {
    arrows?: boolean;
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
  };
}

function SliderBanner({ settings }: SliderComponentProps) {
  const defaultSettings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  const finalSettings = { ...defaultSettings, ...settings };

  return (
    <div className={styles.container}>
      <Slider {...finalSettings}>
        <div className={styles.box}>
          <h3>1</h3>
        </div>
        <div className={styles.box}>
          <h3>2</h3>
        </div>
        <div className={styles.box}>
          <h3>3</h3>
        </div>
        <div className={styles.box}>
          <h3>4</h3>
        </div>
        <div className={styles.box}>
          <h3>5</h3>
        </div>
        <div className={styles.box}>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}

export default SliderBanner;
