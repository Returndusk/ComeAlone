import React from 'react';
import styles from './ScheduleEdit.module.scss';

function ImageScheduleEdit({ image }: { image: string }) {
  return (
    <div className={styles.imageWrapper}>
      <img
        className={styles.image}
        src={image}
        alt='representative-image'
        onClick={() => console.log('이미지 수정')}
      />
      <p>대표 이미지 수정하기</p>
    </div>
  );
}

export default ImageScheduleEdit;
