import React from 'react';
import { useLocation } from 'react-router';
import styles from './Footer.module.scss';
import ROUTER from '../../../constants/Router';

function Footer() {
  const location = useLocation();
  const targetPages = [
    ROUTER.MYPAGE,
    ROUTER.LOGIN,
    ROUTER.MYPAGE_EDIT,
    ROUTER.REGISTER
  ];
  const isTargetPage = targetPages.includes(location.pathname);
  const isFooterVisible = !location.pathname.startsWith(ROUTER.DESTINATION_LIST);

  // 목적지 라우터에서는 푸터 그리지 않도록 예외처리
  if (!isFooterVisible) {
    return null;
  }

  return (
    <div className={`${styles.layout} ${isTargetPage ? styles.whiteBg : ''}`}>
      <div className={styles.body}>
        <div className={styles.layoutLeft}>혼자옵서예</div>
        <div className={styles.layoutRight}>
          <p>
            공동대표 :{' '}
            <a href='https://github.com/LL-SS' target='_blank' rel='noreferrer'>
              이선우
            </a>{' '}
            <a
              href='https://github.com/whoodongpyo'
              target='_blank'
              rel='noreferrer'
            >
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
            <a
              href='https://github.com/JeLee-river'
              target='_blank'
              rel='noreferrer'
            >
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
          <p>주소 : 서울 성동구 아차산로17길 48 성수낙낙</p>
          <p>ⓒ ComeAlone Corp. All right Reserved</p>
          <p>Thanks to : React, NestJS, MUI, 제주관광공사</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
