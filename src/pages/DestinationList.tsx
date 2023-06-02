import React from 'react';
import AddToScheduleModal from '../components/DestinationList/Modal/AddToScheduleModal';
import Layout from '../components/DestinationList/Layout';
import Search from '../components/DestinationList/Search';

function DestinationList() {
  return (
    <Layout>
      <Search />
      <AddToScheduleModal />
    </Layout>
  );
}

export default DestinationList;
