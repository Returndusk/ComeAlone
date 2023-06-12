import React from 'react';
import styles from './ProfileImage.module.scss';
import { Avatar } from '@mui/material';

type ProfileImageProps = {
  image: string;
  nickname: string;
};

function ProfileImage({ image, nickname }: ProfileImageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {image && (
          <Avatar src={image} className={styles.image} alt='프로필 이미지' />
        )}
        {!image && (
          <Avatar className={styles.image} alt='프로필 이미지'>
            <span>{nickname[0]}</span>
          </Avatar>
        )}
      </div>
    </div>
  );
}

export default ProfileImage;
