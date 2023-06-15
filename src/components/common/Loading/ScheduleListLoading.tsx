import React from 'react';
import styles from './ScheduleListLoading.module.scss';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function Loading() {
  return (
    <>
      <div className={styles.skeleton}>
        <Stack spacing={2}>
          <Skeleton
            animation='wave'
            variant='rounded'
            width={250}
            height={50}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            width={200}
            height={30}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            width={200}
            height={30}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            width={200}
            height={30}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            width='100%'
            height={60}
          />
        </Stack>
      </div>
      <div className={styles.skeleton}>
        <Stack spacing={2}>
          <Skeleton
            animation='wave'
            variant='rounded'
            width={250}
            height={50}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            width={200}
            height={30}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            width={200}
            height={30}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            width={200}
            height={30}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            width='100%'
            height={60}
          />
        </Stack>
      </div>
      <div className={styles.skeleton}>
        <Stack spacing={2}>
          <Skeleton
            animation='wave'
            variant='rounded'
            width={250}
            height={50}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            width={200}
            height={30}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            width={200}
            height={30}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            width={200}
            height={30}
          />
          <Skeleton
            animation='wave'
            variant='rounded'
            width='100%'
            height={60}
          />
        </Stack>
      </div>
    </>
  );
}

export default Loading;
