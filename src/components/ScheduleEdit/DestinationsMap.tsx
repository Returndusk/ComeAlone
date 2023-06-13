import React from 'react';
import styles from './DestinationsMap.module.scss';
import MapWithWaypoints from '../common/Map/MapWithWaypoints';
import { MapWithWaypointsPropsType } from '../../types/DestinationListTypes';

function DestinationsMap({
  markersLocations
}: {
  markersLocations: MapWithWaypointsPropsType[];
}) {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.map}>
        <MapWithWaypoints markersLocations={markersLocations} />
      </div>
    </div>
  );
}

export default DestinationsMap;
