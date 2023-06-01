import React, { useState } from 'react';
import styles from './ScheduleDetail.module.scss';

function DestinationListComponent({
  destinations,
  onChecked
}: {
  destinations: string[][];
  onChecked: any;
}) {
  const [checkedDayIndex, setCheckedDayIndex] = useState(-1);

  return (
    <div className={styles['destinations-wrapper']}>
      <div className={styles['destinations-title']}>목적지 리스트</div>
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
      <div className={styles['destinations-list']}>
        {destinations.map((destOfDay, index) => {
          return (
            <ol
              key={index}
              className={styles['destinations-day']}
              id={'day' + (index + 1).toString()}
            >
              <label>
                <input
                  type='checkbox'
                  checked={checkedDayIndex === index}
                  onChange={() => {
                    if (checkedDayIndex === index) {
                      setCheckedDayIndex(-1);
                      onChecked(destinations.flat());
                    } else {
                      setCheckedDayIndex(index);
                      onChecked(destOfDay);
                    }
                  }}
                />{' '}
                Day {index + 1}
              </label>
              {destOfDay.map((dest, index) => (
                <li key={index}>{dest}</li>
              ))}
            </ol>
          );
        })}
      </div>
    </div>
  );
}

export default DestinationListComponent;
