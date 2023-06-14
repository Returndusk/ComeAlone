import React from 'react';
import styles from './FoundError.module.scss';
import { MdOutlineErrorOutline } from 'react-icons/md';
import Router from '../../constants/Router';
import { Link } from 'react-router-dom';

function FoundError() {
  return (
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <MdOutlineErrorOutline className={styles.icon} />
      </div>
      <div className={styles.textContainer}>
        <h1>404 NotFound</h1>
        <h2>페이지를 찾을 수 없습니다.</h2>
        <Link to={Router.MAIN}>
          <button>홈으로 가기</button>
        </Link>
      </div>
    </div>
  );
}

export default FoundError;
