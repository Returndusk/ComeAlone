import React from 'react';
import SearchArea from '../components/Main/SearchArea';
import SliderBanner from '../components/Main/SliderBanner';
import styles from '../components/Main/Main.module.scss';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function Main() {
  return (
    <div className={styles.wrapper}>
      <SearchArea />

      <div className={styles.destinationRank}>
        <h2>📌 인기 목적지</h2>
        <SliderBanner
          settings={{ autoplay: false }}
          api={`${apiBaseUrl}/ranking/destinations?count=12`}
          urlTemplate='/destination/list/{id}?search={destination_title}'
          idProperty='destination_id'
          titleProperty='destination_title'
          imageProperty='destination_image1'
          overviewProperty='destination_overview'
          showCategory={true}
          customClassName='BottomSlider'
          boxClassName='BottomBox'
          imageContainerClassName='BottomImageContainer'
        />
      </div>

      <div className={styles.scheduleRank}>
        <h2>🌍 인기 일정</h2>
        <SliderBanner
          settings={{ autoplay: false }}
          api={`${apiBaseUrl}/ranking/schedules?count=12`}
          urlTemplate='/schedule/detail/{schedule_schedule_id}'
          idProperty='schedule_schedule_id'
          titleProperty='schedule_title'
          imageProperty='schedule_image'
          overviewProperty='schedule_summary'
          customClassName='BottomSlider'
          boxClassName='BottomBox'
          textClassName='text2'
          imageContainerClassName='BottomImageContainer'
        />
      </div>
    </div>
  );
}

export default Main;
