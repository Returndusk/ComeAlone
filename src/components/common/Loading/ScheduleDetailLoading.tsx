import React from 'react';
import styles from './ScheduleDetailLoading.module.scss';
import Skeleton from '@mui/material/Skeleton/Skeleton';

function ScheduleDetailLoading() {
  return (
    <div className={styles.container}>
      <Skeleton
        className={styles.image}
        variant='rounded'
        width={1000}
        height={400}
      />
      <Skeleton className={styles.date} height={40} />
      <Skeleton className={styles.title} height={60} />
      <Skeleton className={styles.duration} height={40} />
      <div className={styles.writer}>
        <Skeleton
          className={styles.avatar}
          variant='circular'
          width={50}
          height={50}
        ></Skeleton>
        <Skeleton className={styles.nickname} />
      </div>
      <Skeleton className={styles.summary} height={200} />
    </div>
  );
}

export default ScheduleDetailLoading;
