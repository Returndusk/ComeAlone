import React from 'react';
import styles from './FoundError.module.scss';
import Router from '../../constants/Router';
import { Link } from 'react-router-dom';
import NotFountImage from '../../assets/404.png'

function FoundError() {
  return (
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <img src={NotFountImage} alt="" />
      </div>
      <div className={styles.textContainer}>
        <h1>404 Not Found</h1>
        <h2>페이지를 찾을 수 없습니다.</h2>
        <Link to={Router.MAIN}>
          <button>홈으로 가기</button>
        </Link>
      </div>
    </div>
  );
}

export default FoundError;
