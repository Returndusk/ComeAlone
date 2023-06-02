import React from 'react';
import styles from '../components/Login/Login.module.scss';
import LoginForm from '../components/Login/LoginForm';

function Login() {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <h1>로그인</h1>
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
