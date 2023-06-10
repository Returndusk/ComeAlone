import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.layout}>
      <div className={styles.body}>
        <div className={styles.layoutLeft}>혼자옵서예</div>
        <div className={styles.layoutRight}>
          <p>
            공동대표 :{' '}
            <a href='' target='_blank' rel='noreferrer'>
              이선우
            </a>{' '}
            <a href='' target='_blank' rel='noreferrer'>
              표후동
            </a>{' '}
            <a
              href='https://github.com/icallitnewart'
              target='_blank'
              rel='noreferrer'
            >
              천서연
            </a>{' '}
            <a
              href='https://github.com/Returndusk'
              target='_blank'
              rel='noreferrer'
            >
              김득열
            </a>{' '}
            <a href='' target='_blank' rel='noreferrer'>
              이정은
            </a>{' '}
            <a
              href='https://github.com/LEEJW1953'
              target='_blank'
              rel='noreferrer'
            >
              이지원
            </a>{' '}
            <a
              href='https://github.com/whThswh'
              target='_blank'
              rel='noreferrer'
            >
              조정현
            </a>
          </p>
          <p>사업자등록번호 : 123-45-567890</p>
          <p>주소 : 서울 성동구 아차산로17길 48 성수낙낙</p>
          <p>ⓒ ComeAlone Corp. All right Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
