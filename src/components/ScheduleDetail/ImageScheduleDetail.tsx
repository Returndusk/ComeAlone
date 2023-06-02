import React from 'react';
import styles from './ScheduleDetail.module.scss';

function ImageScheduleDetail({ image }: { image: string }) {
  return (
    <div className={styles.imageWrapper}>
      <img className={styles.image} src={image} alt='representative-image' />
    </div>
  );
}

export default ImageScheduleDetail;
