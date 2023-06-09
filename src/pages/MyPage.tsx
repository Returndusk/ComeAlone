import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useAuthState } from '../contexts/AuthContext';
import { getUser } from '../apis/UserAPI';
import { UserDetail } from '../types/UserTypes';
import UserInfo from '../components/MyPage/UserInfo';
import ProfileImage from '../components/MyPage/ProfileImage';
import styles from '../components/MyPage/MyPage.module.scss';
import MyPageButtons from '../components/MyPage/MyPageButtons';
import DeleteAccountForm from '../components/MyPage/DeleteAccountForm';

function MyPage() {
  const { updateAuthState } = useAuthState();
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
          if (err.response?.status === 401) {
            if (
              err.response.data.reason === 'INVALID' ||
              err.response.data.reason === 'EXPIRED'
            ) {
              alert('로그인 상태가 아닙니다. 다시 로그인해주세요.');
              return updateAuthState(false);
            }
          }
        }

        console.log(err);
        alert('회원 정보 불러오기에 실패하였습니다.');
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
