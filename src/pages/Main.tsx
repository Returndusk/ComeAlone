import React from 'react';
import SearchArea from '../components/Main/SearchArea';
import Banner from '../components/Main/Banner';
import SliderBanner from '../components/Main/SliderBanner';
import styles from '../components/Main/Main.module.scss';

function Main() {
  return (
    <div className={styles.container}>
      <SearchArea />
      <div className={styles.gridContainer}>
        <div className={styles.leftBanner}>
          <Banner />
        </div>
        <div className={styles.topArea}>
          <SliderBanner settings={{ autoplay: false }} />
        </div>
        <div className={styles.bottomArea}>
          <SliderBanner settings={{ autoplay: false }} />
        </div>
        <div className={styles.rightBanner}>
          <Banner />
        </div>
      </div>
    </div>
  );
}

export default Main;
