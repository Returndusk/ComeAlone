import React from 'react';
import LikedScheduleLists from '../components/ScheduleList/LikedScheduleList';
import ScrollTop from '../components/common/ScrollTop/ScrollTop';
import ScheduleLists from '../components/ScheduleList/ScheduleList';

function LikedScheduleList() {
  return (
    <div>
      <ScheduleLists>
        <LikedScheduleLists />
      </ScheduleLists>
      <ScrollTop />
    </div>
  );
}

export default LikedScheduleList;
