import React from 'react';
import RecentScheduleLists from '../components/ScheduleList/RecentScheduleList';
import ScrollTop from '../components/common/ScrollTop/ScrollTop';
import ScheduleLists from '../components/ScheduleList/ScheduleList';

function RecentScheduleList() {
  return (
    <div>
      <ScheduleLists>
        <RecentScheduleLists />
      </ScheduleLists>
      <ScrollTop />
    </div>
  );
}

export default RecentScheduleList;
