import React, { useState } from 'react';
import styles from '../components/UserEdit/UserEdit.module.scss';
import UserEditForm from '../components/UserEdit/UserEditForm';
import UserConfirmForm from '../components/UserEdit/UserConfirmForm';

function UserEdit() {
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <h1>회원 정보 수정</h1>
        {!isPasswordConfirmed && (
          <UserConfirmForm confirmUser={() => setIsPasswordConfirmed(true)} />
        )}
        {isPasswordConfirmed && <UserEditForm />}
      </div>
    </main>
  );
}

export default UserEdit;
