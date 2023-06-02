import React from 'react';
import styles from './ScrollTop.module.scss';

function ScrollTop() {
  function scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={styles.scrollButtonBox}>
      <button className={styles.scrollTopButton} onClick={scrollToTop}>
        ▲
      </button>
    </div>
  );
}

export default ScrollTop;
