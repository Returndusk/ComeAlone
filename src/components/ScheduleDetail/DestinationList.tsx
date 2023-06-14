import React, { useState, Dispatch, SetStateAction } from 'react';
import styles from './DestinationList.module.scss';
import { MapWithWaypointsPropsType } from '../../types/DestinationListTypes';
import { FaMapMarkerAlt } from 'react-icons/fa';

function DestinationList({
  destinations,
  destinationCount,
  onDestinationsChecked
}: {
  destinations: MapWithWaypointsPropsType[][];
  destinationCount: number;
  onDestinationsChecked: Dispatch<SetStateAction<MapWithWaypointsPropsType[]>>;
}) {
  const [checkedDayIndex, setCheckedDayIndex] = useState(-1);

  return (
    <>
      <div className={styles.destinationsTitle}>
        <FaMapMarkerAlt className={styles.destinationsIcon} />
        목적지 <div className={styles.destinationCount}>{destinationCount}</div>
      </div>
      <div className={styles.destinationsContainer}>
        <label>
          <input
            type='radio'
            checked={checkedDayIndex === -1}
            onChange={() => {
              setCheckedDayIndex(-1);
              onDestinationsChecked(destinations.flat());
            }}
          />
          <span className={styles.allDestinations}>전체 목적지 보기</span>
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
                    <div>
                      <input
                        type='radio'
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
                      <span>{index + 1}일차</span>
                    </div>
                  </label>
                  {destOfDay.length > 0 ? (
                    destOfDay.map(
                      (dest: MapWithWaypointsPropsType, index: number) => (
                        <li key={index}>{dest.title}</li>
                      )
                    )
                  ) : (
                    <div className={styles.noDestination}>
                      목적지가 존재하지 않습니다.
                    </div>
                  )}
                </ol>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}

export default DestinationList;
