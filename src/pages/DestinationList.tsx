import React from 'react';
import AddToScheduleModal from '../components/Modals/AddToScheduleModal';
import Layout from '../components/DestinationList/Layout';
import Destinations from '../components/DestinationList/Destinations';

function DestinationList() {
  return (
    <Layout>
      <Destinations />
      <AddToScheduleModal />
    </Layout>
  );
}

export default DestinationList;
