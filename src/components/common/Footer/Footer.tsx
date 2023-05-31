import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.layout}>
      <div className={styles.layoutLeft}>혼자옵서예</div>
      <div className={styles.layoutRight}>
        <p>상호 : (주)엘리스 SW트랙 4기 8팀</p>
        <p>사업자등록번호 : 123-45-567890</p>
        <p>주소 : 서울 성동구 아차산로17길 48 성수낙낙</p>
        <p>ⓒ ComeAlone Corp. All right Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
