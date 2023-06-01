import React from 'react';
import styles from './ScheduleDetail.module.scss';

function ScheduleDetailImageComponent({ image }: { image: string }) {
  return (
    <div className={styles['image-wrapper']}>
      <img className={styles.image} src={image} alt='representative-image' />
    </div>
  );
}

export default ScheduleDetailImageComponent;
