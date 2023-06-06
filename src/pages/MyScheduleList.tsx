import React from 'react';
import MyScheduleLists from '../components/ScheduleList/MyScheduleList';
import ScrollTop from '../components/common/ScrollTop/ScrollTop';
import CreateScheduleModal from '../components/ScheduleList/Modal/CreateScheduleModal';

function ScheduleList() {
  return (
    <div>
      <CreateScheduleModal />
      <MyScheduleLists />
      <ScrollTop />
    </div>
  );
}

export default ScheduleList;
