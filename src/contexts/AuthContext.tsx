import React, { createContext, useContext, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { getUser, refreshUserTokens } from '../apis/user';
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS
} from '../constants/Token';

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

export type UserData = {
  id: string;
  nickname: string;
  birth_date: string;
  gender: string;
  phone_number: string;
  profile_image: string;
  created_at: string;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuthState() {
  const state = useContext(AuthContext);
  if (!state) throw new Error('AuthProvider를 찾을 수 없습니다.');
  const { authState, updateAuthState } = state;

  return { authState, updateAuthState };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const cookies = new Cookies();
  const initAuthState: AuthStateType = {
    isLoggedIn: null,
    user: null
  };
  const [authState, setAuthState] = useState<AuthStateType>(initAuthState);
  console.log(authState);

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
        }
      } catch (error) {
        cookies.remove('accessToken', { path: '/' });
        cookies.remove('refreshToken', { path: '/' });
        updateAuthState(false);
      }
    };

    if (refreshToken) {
      getUserState(refreshToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
