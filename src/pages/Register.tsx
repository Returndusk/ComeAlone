import React from 'react';
import styles from '../components/Register/Register.module.scss';
import RegisterForm from '../components/Register/RegisterForm';

function Register() {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <h1>회원가입</h1>
        <RegisterForm />
      </div>
    </main>
  );
}

export default Register;
