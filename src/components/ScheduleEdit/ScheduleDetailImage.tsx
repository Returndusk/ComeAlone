import React from 'react';
import styles from './ScheduleEdit.module.scss';

function ScheduleDetailImageComponent({ image }: { image: string }) {
  return (
    <div className={styles['image-wrapper']}>
      <img className={styles.image} src={image} alt='representative-image' />
      <p>대표 이미지 수정하기</p>
    </div>
  );
}

export default ScheduleDetailImageComponent;
