import React from 'react';
import Slider from 'react-slick';
import styles from './DestinationSlider.module.scss';

function DestinationSlider() {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // 슬라이드를 자동으로 넘길지 여부
    autoplaySpeed: 5000 // 자동으로 넘길 시 시간 간격
  };

  return (
    <div className={styles.topArea}>
      <Slider {...settings}>
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

export default DestinationSlider;
