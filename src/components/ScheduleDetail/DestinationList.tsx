import React, { useState, Dispatch, SetStateAction } from 'react';
import styles from './DestinationList.module.scss';
import { MapWithWaypointsPropsType } from '../../types/DestinationListTypes';

function DestinationList({
  destinations,
  onDestinationsChecked
}: {
  destinations: MapWithWaypointsPropsType[][];
  onDestinationsChecked: Dispatch<SetStateAction<MapWithWaypointsPropsType[]>>;
}) {
  const [checkedDayIndex, setCheckedDayIndex] = useState(-1);

  return (
    <div className={styles.destinationsContainer}>
      <div className={styles.destinationsTitle}>목적지 리스트</div>
      <label>
        <input
          type='checkbox'
          checked={checkedDayIndex === -1}
          onChange={() => {
            setCheckedDayIndex(-1);
            onDestinationsChecked(destinations.flat());
          }}
        />
        전체 목적지 보기
      </label>
      <div className={styles.destinationsList}>
        {destinations.map(
          (destOfDay: MapWithWaypointsPropsType[], index: number) => {
            return (
              <ol
                key={index}
                className={styles.destinationsDay}
                id={`day ${index + 1}`}
              >
                <label>
                  <div className={styles.destinationDayTitle}>
                    <input
                      type='checkbox'
                      checked={checkedDayIndex === index}
                      onChange={() => {
                        if (checkedDayIndex === index) {
                          setCheckedDayIndex(-1);
                          onDestinationsChecked(destinations.flat());
                        } else {
                          setCheckedDayIndex(index);
                          onDestinationsChecked(destOfDay);
                        }
                      }}
                    />{' '}
                    Day {index + 1}
                  </div>
                </label>
                {destOfDay.map(
                  (dest: MapWithWaypointsPropsType, index: number) => (
                    <li key={index}>{dest.title}</li>
                  )
                )}
              </ol>
            );
          }
        )}
      </div>
    </div>
  );
}

export default DestinationList;
