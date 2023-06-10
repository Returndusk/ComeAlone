import React from 'react';
import styles from './UserInfo.module.scss';
import { UserDetail } from '../../types/UserTypes';

type UserInfoProps = {
  user: UserDetail;
};

function UserInfo({ user }: UserInfoProps) {
  const { email, nickname, birthDate, phoneNumber, gender } = user;
  return (
    <ul className={styles.userInfo}>
      <li>
        <span className={styles.infoType}>이메일</span>
        <span className={styles.infoDetail}>{email}</span>
      </li>
      <li>
        <span className={styles.infoType}>닉네임</span>
        <span className={styles.infoDetail}>{nickname}</span>
      </li>
      <li>
        <span className={styles.infoType}>성별</span>
        <span className={styles.infoDetail}>{gender}</span>
      </li>
      <li>
        <span className={styles.infoType}>생년월일</span>
        <span className={styles.infoDetail}>
          {`${birthDate.split('-')[0]}년 
              ${birthDate.split('-')[1]}월 
              ${birthDate.split('-')[2]}일
          `}
        </span>
      </li>
      <li>
        <span className={styles.infoType}>연락처</span>
        <span className={styles.infoDetail}>{phoneNumber}</span>
      </li>
    </ul>
  );
}

export default UserInfo;
