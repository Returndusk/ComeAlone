import React, { useState } from 'react';
import UserInfo from '../components/MyPage/UserInfo';
import ProfileImage from '../components/MyPage/ProfileImage';
import styles from '../components/MyPage/MyPage.module.scss';
import MyPageButtons from '../components/MyPage/MyPageButtons';
import DeleteAccountForm from '../components/MyPage/DeleteAccountForm';

function MyPage() {
  const [deleteAccountAttempt, setDeleteAccountAttempt] = useState(false);

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <h1>마이페이지</h1>
        {!deleteAccountAttempt && (
          <>
            <ProfileImage />
            <UserInfo />
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
