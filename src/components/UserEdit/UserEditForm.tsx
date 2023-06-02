import React, { useState } from 'react';
import styles from './UserEditForm.module.scss';
import ProfileImage from './ProfileImage';
import UserInfo from './UserInfo';
import Buttons from './Buttons';

export interface UserInfoValues {
  email: string;
  profileImageUrl: string;
  nickname: string;
  newPassword: '';
  passwordConfirm: '';
  birthDate: string;
  gender: string;
  phoneNumber: string;
}

const userInfo = {
  email: 'elice@test.com',
  profileImageUrl: '',
  nickname: '엘리스',
  birthDate: '1999/01/01',
  gender: 'female',
  phoneNumber: '010-1234-1234'
};

function UserEditForm() {
  const initValues: UserInfoValues = {
    email: userInfo.email,
    profileImageUrl: userInfo.profileImageUrl,
    nickname: userInfo.nickname,
    newPassword: '',
    passwordConfirm: '',
    birthDate: userInfo.birthDate,
    gender: userInfo.gender,
    phoneNumber: userInfo.phoneNumber
  };
  const [values, setValues] = useState<UserInfoValues>(initValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className={styles.form}>
      <ProfileImage url={userInfo.profileImageUrl} />
      <UserInfo values={values} handleChange={handleChange} />
      <Buttons />
    </form>
  );
}

export default UserEditForm;
