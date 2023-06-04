import React from 'react';
import ScheduleLists from '../components/ScheduleList/ScheduleList';
import ScrollTop from '../components/common/ScrollTop/ScrollTop';
import CreateScheduleModal from '../components/ScheduleList/Modal/CreateScheduleModal';

function ScheduleList() {
  return (
    <div>
      <CreateScheduleModal />
      <ScheduleLists />
      <ScrollTop />
    </div>
  );
}

export default ScheduleList;
