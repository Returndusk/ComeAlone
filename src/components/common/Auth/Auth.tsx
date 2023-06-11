import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../../../contexts/AuthContext';
import ROUTER from '../../../constants/Router';

type AuthProps = {
  children: React.ReactElement;
  required: boolean;
};

function Auth({ children, required }: AuthProps) {
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
        navigate(ROUTER.MAIN);
      }
    }
  }, [isLoggedIn, navigate, required]);

  return <>{children}</>;
}

export default Auth;
