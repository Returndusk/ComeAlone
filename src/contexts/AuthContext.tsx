import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { getUser, refreshUserTokens } from '../apis/UserAPI';
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS
} from '../constants/Token';
import { UserData } from '../types/UserTypes';

export type AuthStateType = {
  isLoggedIn: boolean | null;
  user: UserData | null;
};

type AuthContextProps = {
  authState: AuthStateType;
  updateAuthState: (isLoggedIn: boolean, userData?: UserData | null) => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuthState() {
  const state = useContext(AuthContext);
  if (!state) throw new Error('AuthProvider를 찾을 수 없습니다.');

  return state;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const location = useLocation();
  const cookies = new Cookies();
  const initAuthState: AuthStateType = {
    isLoggedIn: null,
    user: null
  };
  const [authState, setAuthState] = useState<AuthStateType>(initAuthState);
  // console.log(authState);

  const updateAuthState = (
    isLoggedIn: boolean,
    userData: UserData | null = null
  ) => {
    if (isLoggedIn) {
      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: true,
        user: userData
      }));
    } else {
      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: false,
        user: null
      }));
    }
  };

  //페이지 처음 로드시 (새로고침시)
  useEffect(() => {
    //리프레시 토큰으로 액세스 & 리프레시 토큰 재발급
    const refreshToken = cookies.get('refreshToken');
    const getUserState = async (refreshToken: string) => {
      try {
        const response = await refreshUserTokens(refreshToken);
        const data = response.data;

        if (response.status === 201) {
          cookies.set(
            'accessToken',
            data.accessToken,
            ACCESS_TOKEN_COOKIE_OPTIONS
          );
          cookies.set(
            'refreshToken',
            data.refreshToken,
            REFRESH_TOKEN_COOKIE_OPTIONS
          );

          const userInfo = await getUser();
          updateAuthState(true, userInfo.data);
        } else {
          alert(
            '로그인 처리 중 알 수 없는 문제가 발생하였습니다. 계속 문제가 발생한다면 서비스 제공자에게 문의해주세요.'
          );
        }
      } catch (error) {
        cookies.remove('accessToken', { path: '/' });
        cookies.remove('refreshToken', { path: '/' });
        updateAuthState(false);
      }
    };

    if (refreshToken) {
      getUserState(refreshToken);
    } else {
      updateAuthState(false);
    }
  }, []);

  //url 변경시 isLoggedIn이 true인데 리프레시 토큰이 없을 경우 상태 업데이트
  useEffect(() => {
    const refreshToken = cookies.get('refreshToken');

    if (!refreshToken && authState.isLoggedIn) {
      updateAuthState(false);
    }
  }, [location]);

  return (
    <AuthContext.Provider value={{ authState, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
