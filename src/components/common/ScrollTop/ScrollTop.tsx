import React from 'react';
import styles from './ScrollTop.module.scss';
import { FaArrowCircleUp } from 'react-icons/fa';

function ScrollTop() {
  function scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={styles.scrollButtonBox}>
      <div className={styles.scrollTopButton} onClick={scrollToTop}>
        <FaArrowCircleUp />
      </div>
    </div>
  );
}

export default ScrollTop;
