import React from 'react';
import styles from './ImageScheduleDetail.module.scss';

function ImageScheduleDetail({ image }: { image: string }) {
  return (
    <div className={styles.imageContainer}>
      <img className={styles.image} src={image} alt='representative-image' />
    </div>
  );
}

export default ImageScheduleDetail;
