import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.scss';
import Weather from './Weather';
import { BiCalendar, BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleUserIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.layoutLeft}>
        <Link to='/' className={styles.logo}>
          혼자옵서예
        </Link>
        <nav>
          <ul>
            <Link to='/destination/list'>목적지</Link>
            <Link to='/schedule/list'>여행일정</Link>
          </ul>
        </nav>
      </div>
      <div className={styles.layoutRight}>
        <Weather />
        <Link to='/schedule/edit'>
          <BiCalendar className={styles.calendar} />
        </Link>
        <div className={styles.auth}>
          <BiUserCircle
            className={`${styles.userIcon} ${
              isDropdownOpen ? styles.open : ''
            }`}
            onClick={handleUserIconClick}
          />

          {isDropdownOpen && (
            <div className={styles.dropdownMenu} ref={dropdownRef}>
              <Link to='/mypage' onClick={() => setDropdownOpen(false)}>
                마이페이지
              </Link>
              <br />
              <Link to='/logout' onClick={() => setDropdownOpen(false)}>
                로그아웃
              </Link>
            </div>
          )}

          <Link to='/login'>
            <span>로그인</span>
          </Link>
          {' | '}
          <Link to='/register'>
            <span>회원 가입</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
