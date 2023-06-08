import React from 'react';
import SearchArea from '../components/Main/SearchArea';
import SliderBanner from '../components/Main/SliderBanner';
import styles from '../components/Main/Main.module.scss';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function Main() {
  return (
    <div className={styles.container}>
      <SearchArea />
      <SliderBanner
        settings={{ autoplay: false }}
        api={`${apiBaseUrl}/ranking/destinations?count=12`}
        urlTemplate='/destination/list/{id}?search={title}'
      />
      <SliderBanner
        settings={{ autoplay: false }}
        api={`${apiBaseUrl}/ranking/schedules?count=12`}
        urlTemplate='/schedule/detail/{schedule_id}'
      />
    </div>
  );
}

export default Main;
