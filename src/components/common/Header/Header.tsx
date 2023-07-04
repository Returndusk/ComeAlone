import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import Weather from './Weather';
import styles from './Header.module.scss';
import { useAuthState } from '../../../contexts/AuthContext';
import { Cookies } from 'react-cookie';
import AlertModal from '../Alert/AlertModal';
import { AiOutlineCalendar } from 'react-icons/ai';
import Avatar from '@mui/material/Avatar';
import Router from '../../../constants/Router';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const isFloat = location.pathname === '/';
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(
    null
  );
  const { authState, updateAuthState } = useAuthState();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleUserIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutButtonClick = () => {
    handleClose();
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    const cookies = new Cookies();
    cookies.remove('accessToken', { path: '/' });
    cookies.remove('refreshToken', { path: '/' });
    updateAuthState(false);
    handleClose();
    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
    handleClose();
  };

  useEffect(() => {
    const handleScroll = () => {
      const isActiveHeight = window.scrollY > 0;
      if (isActiveHeight !== isActive) {
        setIsActive((prev) => !prev);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header
      className={`${styles.layout} 
      ${isFloat ? (isActive ? styles.active : styles.float) : ''}
        `}
    >
      <div className={styles.body}>
        <div className={styles.layoutLeft}>
          <RouterLink to={Router.MAIN} className={styles.logo}>
            혼자옵서예
          </RouterLink>
          <nav>
            <ul>
              <li>
                <RouterLink to={Router.DESTINATION_LIST}>목적지</RouterLink>
              </li>
              <li>
                <RouterLink to={`${Router.SCHEDULE_LIST}/likes`}>
                  여행일정
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.layoutRight}>
          <Weather />
          {authState.isLoggedIn && authState.user && (
            <>
              <div className={styles.auth}>
                <button
                  title='내 일정'
                  onClick={() => navigate(Router.MYSCHEDULE_LIST)}
                >
                  <AiOutlineCalendar />
                </button>

                <button onClick={handleUserIconClick}>
                  {authState.user.profile_image ? (
                    <Avatar
                      src={authState.user.profile_image}
                      alt={authState.user.nickname}
                      className={styles.Avatar}
                    />
                  ) : (
                    <Avatar className={styles.Avatar}>
                      {authState.user.nickname[0]}
                    </Avatar>
                  )}
                </button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  disableScrollLock={true}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <MenuItem
                    style={{
                      fontSize: '14px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                    onClick={() => {
                      navigate(Router.MYPAGE);
                      handleClose();
                    }}
                  >
                    마이페이지
                  </MenuItem>
                  <MenuItem
                    style={{
                      fontSize: '14px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                    onClick={() => {
                      navigate(Router.MYREVIEW);
                      handleClose();
                    }}
                  >
                    나의 리뷰
                  </MenuItem>
                  <MenuItem
                    style={{
                      fontSize: '14px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                    onClick={handleLogoutButtonClick}
                  >
                    로그아웃
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}
          {authState.isLoggedIn === false && (
            <div className={styles.auth}>
              <RouterLink to={Router.LOGIN}>
                <span>로그인</span>
              </RouterLink>
              {' | '}
              <RouterLink to={Router.REGISTER}>
                <span>회원 가입</span>
              </RouterLink>
            </div>
          )}
          {showLogoutModal && (
            <AlertModal
              message='로그아웃 하시겠습니까?'
              onConfirm={handleLogoutConfirm}
              onCancel={handleLogoutCancel}
              showCancelButton={true}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
