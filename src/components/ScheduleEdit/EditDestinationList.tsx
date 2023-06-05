import React, { useState } from 'react';
import styles from './EditDestinationList.module.scss';
import { DestinationsType } from '../../types/DestinationListTypes';

function EditDestinationList({
  destinations,
  onChecked,
  handleDestinationList
}: {
  destinations: DestinationsType[][];
  onChecked: any;
  handleDestinationList: any;
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
            onChecked(destinations.flat());
          }}
        />
        전체 목적지 보기
      </label>
      <div className={styles.destinationsList}>
        {destinations.map((destOfDay, dayIndex) => {
          return (
            <ol
              key={dayIndex}
              className={styles.destinationsDay}
              id={'day' + (dayIndex + 1).toString()}
            >
              <label>
                <input
                  type='checkbox'
                  checked={checkedDayIndex === dayIndex}
                  onChange={() => {
                    if (checkedDayIndex === dayIndex) {
                      setCheckedDayIndex(-1);
                      onChecked(destinations.flat());
                    } else {
                      setCheckedDayIndex(dayIndex);
                      onChecked(destOfDay);
                    }
                  }}
                />{' '}
                Day {dayIndex + 1}
              </label>
              {destOfDay.map((dest, destIndex) => (
                <li key={destIndex}>
                  {dest.title}
                  <button
                    onClick={() => {
                      destinations[dayIndex].splice(destIndex, 1);

                      const newDestinations = [...destinations];

                      handleDestinationList(newDestinations);
                    }}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ol>
          );
        })}
      </div>
    </div>
  );
}

export default EditDestinationList;
