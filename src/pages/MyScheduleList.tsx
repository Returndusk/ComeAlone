import React from 'react';
import MyScheduleLists from '../components/ScheduleList/MyScheduleList';
import ScrollTop from '../components/common/ScrollTop/ScrollTop';

function ScheduleList() {
  return (
    <div>
      <MyScheduleLists />
      <ScrollTop />
    </div>
  );
}

export default ScheduleList;
