import React from 'react';
import styles from './UserInfo.module.scss';

const userInfo = {
  email: 'elice@test.com',
  nickname: '엘리스',
  birthDate: '1999/01/01',
  gender: 'female',
  phoneNumber: '010-1234-1234'
};

function UserInfo() {
  return (
    <ul className={styles.userInfo}>
      <li>
        <span className={styles.infoType}>이메일</span>
        <span className={styles.infoDetail}>{userInfo.email}</span>
      </li>
      <li>
        <span className={styles.infoType}>닉네임</span>
        <span className={styles.infoDetail}>{userInfo.nickname}</span>
      </li>
      <li>
        <span className={styles.infoType}>생년월일</span>
        <span className={styles.infoDetail}>{userInfo.birthDate}</span>
      </li>
      <li>
        <span className={styles.infoType}>연락처</span>
        <span className={styles.infoDetail}>{userInfo.phoneNumber}</span>
      </li>
    </ul>
  );
}

export default UserInfo;
