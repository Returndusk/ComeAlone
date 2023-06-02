import React from 'react';
import styles from './ProfileImage.module.scss';
import { IoMdSettings } from 'react-icons/io';

interface ProfileImageProps {
  url: string;
}

function ProfileImage({ url }: ProfileImageProps) {
  return (
    <div className={styles.profileImage}>
      <div className={styles.image}>
        <span className={styles.imageChangeBtn}>
          <IoMdSettings />
        </span>
      </div>
    </div>
  );
}

export default ProfileImage;
