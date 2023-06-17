import React from 'react';
import LikesScheduleLists from '../components/ScheduleList/LikesScheduleList';
import ScrollTop from '../components/common/ScrollTop/ScrollTop';
import ScheduleLists from '../components/ScheduleList/ScheduleList';

function LikesScheduleList() {
  return (
    <div>
      <ScheduleLists>
        <LikesScheduleLists />
      </ScheduleLists>
      <ScrollTop />
    </div>
  );
}

export default LikesScheduleList;
