import React from 'react';
import styles from './DestinationsMap.module.scss';
import MapWithWaypoints from '../common/Map/MapWithWaypoints';
import { MapWithWaypointsPropsType } from '../../types/DestinationListTypes';

function DestinationsMap({
  checkedDestinations
}: {
  checkedDestinations: MapWithWaypointsPropsType[];
}) {
  return (
    <div className={styles.mapContainer}>
      <MapWithWaypoints markersLocations={checkedDestinations} />
    </div>
  );
}

export default DestinationsMap;
