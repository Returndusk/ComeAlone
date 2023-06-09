import React, { useEffect, useState } from 'react';
import UserInfo from '../components/MyPage/UserInfo';
import ProfileImage from '../components/MyPage/ProfileImage';
import styles from '../components/MyPage/MyPage.module.scss';
import MyPageButtons from '../components/MyPage/MyPageButtons';
import DeleteAccountForm from '../components/MyPage/DeleteAccountForm';
import { getUser } from '../apis/user';
import { UserDetail } from '../types/UserTypes';
import { AxiosError } from 'axios';

function MyPage() {
  const initValues: UserDetail = {
    email: '',
    nickname: '',
    birthDate: '',
    gender: '',
    phoneNumber: '',
    profileImage: ''
  };

  const [user, setUser] = useState(initValues);
  const [deleteAccountAttempt, setDeleteAccountAttempt] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUser();
        if (response.status === 200) {
          const {
            id,
            birth_date,
            gender,
            nickname,
            phone_number,
            profile_image
          } = response.data;

          setUser((prev: UserDetail) => ({
            ...prev,
            email: id,
            birthDate: birth_date,
            gender,
            nickname,
            phoneNumber: phone_number,
            profileImage: profile_image
          }));
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          console.log(err);
          // if (err.response?.status === 401) {
          // }
        }
      }
    };

    getUserData();
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <h1>마이페이지</h1>
        {!deleteAccountAttempt && (
          <>
            <ProfileImage image={user.profileImage} nickname={user.nickname} />
            <UserInfo user={user} />
            <MyPageButtons
              attemptDeleteAccount={() => {
                setDeleteAccountAttempt(true);
              }}
            />
          </>
        )}
        {deleteAccountAttempt && (
          <DeleteAccountForm
            cancelDeleteAccount={() => {
              setDeleteAccountAttempt(false);
            }}
          />
        )}
      </div>
    </main>
  );
}

export default MyPage;
