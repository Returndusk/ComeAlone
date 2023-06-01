import React from 'react';
import styles from './ScheduleEdit.module.scss';

function ScheduleDetailImageComponent({ image }: { image: string }) {
  return (
    <img className={styles.image} src={image} alt='representative-image' />
  );
}

export default ScheduleDetailImageComponent;
