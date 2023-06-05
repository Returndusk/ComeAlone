import React, { Dispatch, SetStateAction } from 'react';
import styles from './EditDestinationList.module.scss';
import { DestinationsType } from '../DestinationList/Types';

function EditDestinationList({
  destinations,
  checkedDayIndex,
  handleDestinationList,
  handleCheckedDayIndex
}: {
  destinations: DestinationsType[][];
  checkedDayIndex: number;
  handleDestinationList: Dispatch<SetStateAction<DestinationsType[][]>>;
  handleCheckedDayIndex: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className={styles.destinationsContainer}>
      <div className={styles.destinationsTitle}>목적지 리스트</div>
      <label>
        <input
          type='checkbox'
          checked={checkedDayIndex === -1}
          onChange={() => {
            handleCheckedDayIndex(-1);
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
                      handleCheckedDayIndex(-1);
                    } else {
                      handleCheckedDayIndex(dayIndex);
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
