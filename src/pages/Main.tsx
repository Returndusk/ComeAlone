import React from 'react';
import SearchArea from '../components/Main/SearchArea';
import SliderBanner from '../components/Main/SliderBanner';
import styles from '../components/Main/Main.module.scss';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className={styles.searchArea}>
          <SearchArea />
        </div>
        <div className={styles.leftBanner}>{/* <Banner /> */}</div>
        <div className={styles.topArea}>
          <SliderBanner
            settings={{ autoplay: false }}
            api={`${apiBaseUrl}/ranking/destinations?count=12`}
            urlTemplate='/destination/list/0?search={title}'
          />
        </div>
        <div className={styles.bottomArea}>
          <SliderBanner
            settings={{ autoplay: false }}
            api={`${apiBaseUrl}/ranking/schedules?count=12`}
            urlTemplate='/schedules/list/0?search={title}'
          />
        </div>
        <div className={styles.rightBanner}>{/* <Banner /> */}</div>
      </div>
    </div>
  );
}

export default Main;
