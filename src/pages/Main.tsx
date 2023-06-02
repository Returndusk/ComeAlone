import React from 'react';
import DestinationSlider from '../components/Main/DestinationSlider';
import ScheduleSlider from '../components/Main/ScheduleSlider';
import SearchArea from '../components/Main/SearchArea';

function Main() {
  return (
    <div>
      <SearchArea />
      <DestinationSlider />
      <ScheduleSlider />
    </div>
  );
}

export default Main;
