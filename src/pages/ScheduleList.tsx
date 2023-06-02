import React from 'react';
import ScheduleLists from '../components/ScheduleList/ScheduleList';
import ScrollTop from '../components/ScrollTop/ScrollTop';
import CreateScheduleModal from '../components/Modals/CreateScheduleModal';

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
