import React from 'react';
import ScheduleLists from '../components/ScheduleList/ScheduleList';
import CreateScheduleModal from '../components/Modals/CreateScheduleModal';

function ScheduleList() {
  return (
    <div>
      <ScheduleLists />
      <CreateScheduleModal />
    </div>
  );
}

export default ScheduleList;
