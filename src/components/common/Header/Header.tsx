import React, { useState } from 'react';
import { BiCalendar, BiUserCircle } from 'react-icons/bi';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, IconButton } from '@mui/material';
import Weather from './Weather';
import styles from './Header.module.scss';

function Header() {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(
    null
  );

  const handleUserIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLoggedIn = false; // 로그인 상태에 대한 임시 처리

  return (
    <div className={styles.layout}>
      <div className={styles.body}>
        <div className={styles.layoutLeft}>
          <RouterLink to='/' className={styles.logo}>
            혼자옵서예
          </RouterLink>
          <nav>
            <ul>
              <RouterLink to='/destination/list'>목적지</RouterLink>
              <RouterLink to='/schedule/list'>여행일정</RouterLink>
            </ul>
          </nav>
        </div>
        <div className={styles.layoutRight}>
          <Weather />
          {isLoggedIn ? (
            <>
              <RouterLink to='/myschedule/list'>
                <BiCalendar className={styles.calendar} />
              </RouterLink>
              <div className={styles.auth}>
                <IconButton onClick={handleUserIconClick}>
                  <BiUserCircle className={styles.userIcon} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to='/mypage'
                  >
                    마이페이지
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to='/logout'
                  >
                    로그아웃
                  </MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <div className={styles.auth}>
              <RouterLink to='/login'>
                <span>로그인</span>
              </RouterLink>
              {' | '}
              <RouterLink to='/register'>
                <span>회원 가입</span>
              </RouterLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
