import React from 'react';
import ScheduleLists from '../components/ScheduleList/ScheduleList';
import ScrollTop from '../components/common/ScrollTop/ScrollTop';

function ScheduleList() {
  return (
    <div>
      <ScheduleLists />
      <ScrollTop />
    </div>
  );
}

export default ScheduleList;