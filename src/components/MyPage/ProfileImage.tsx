import React from 'react';
import styles from './ProfileImage.module.scss';
import { Avatar } from '@mui/material';

type ProfileImageProps = {
  image: string;
  nickname: string;
};

function ProfileImage({ image, nickname }: ProfileImageProps) {
  return (
    <div className={styles.profileImage}>
      {!image && (
        <Avatar
          style={{
            width: '150px',
            height: '150px',
            fontSize: '80px'
          }}
        >
          {nickname[0]}
        </Avatar>
      )}
      {image && <div className={styles.image}></div>}
    </div>
  );
}

export default ProfileImage;
