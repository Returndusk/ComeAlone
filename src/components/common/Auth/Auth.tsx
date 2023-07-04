import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from '../../../contexts/AuthContext';
import ROUTER from '../../../constants/Router';

type AuthProps = {
  children: React.ReactElement;
  required: boolean;
};

function Auth({ children, required }: AuthProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    authState: { isLoggedIn }
  } = useAuthState();

  useEffect(() => {
    if (isLoggedIn !== null) {
      if (required && !isLoggedIn) {
        //비로그인 유저 접근 제한
        navigate(ROUTER.LOGIN);
      } else if (!required && isLoggedIn) {
        //로그인 유저 접근 제한
        if (!location.state) {
          navigate(ROUTER.MAIN);
        } else {
          //로그인 후 이전 페이지로 이동
          navigate(location.state.prevUrl);
        }
      }
    }
  }, [isLoggedIn, navigate, required]);

  return <>{children}</>;
}

export default Auth;
