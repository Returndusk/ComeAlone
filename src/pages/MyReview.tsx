import React from 'react';
import styles from '../components/MyReview/MyReview.module.scss';
import UsersReview from '../components/MyReview/UsersReview';

function MyReview() {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <h1>마이 리뷰</h1>
        <UsersReview />
      </div>
    </main>
  );
}

export default MyReview;
