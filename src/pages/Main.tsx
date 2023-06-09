import React from 'react';
import SearchArea from '../components/Main/SearchArea';
import SliderBanner from '../components/Main/SliderBanner';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function Main() {
  return (
    <div className='wrapper'>
      <SearchArea />
      <SliderBanner
        settings={{ autoplay: false }}
        api={`${apiBaseUrl}/ranking/destinations?count=12`}
        urlTemplate='/destination/list/{id}?search={title}'
        idProperty='id'
        titleProperty='title'
        imageProperty='image1'
        overviewProperty='overview'
        className='BottomSlider'
      />
      <SliderBanner
        settings={{ autoplay: false }}
        api={`${apiBaseUrl}/ranking/schedules?count=12`}
        urlTemplate='/schedule/detail/{schedule_id}'
        idProperty='schedule_id'
        titleProperty='title'
        imageProperty='image'
        overviewProperty='summary'
        className='BottomSlider'
      />
    </div>
  );
}

export default Main;
