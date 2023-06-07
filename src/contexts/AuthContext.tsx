import React, { createContext, useContext, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { refreshUserTokens } from '../apis/user';

export type AuthStateType = {
  isLoggedIn: boolean;
  user: string | null;
};

type AuthContextProps = {
  authState: AuthStateType;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStateType>>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuthState() {
  const state = useContext(AuthContext);
  if (!state) throw new Error('AuthProvider를 찾을 수 없습니다.');
  const { authState, setAuthState } = state;

  return { authState, setAuthState };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const cookies = new Cookies();
  const initAuthState: AuthStateType = {
    isLoggedIn: false,
    user: null
  };
  const [authState, setAuthState] = useState<AuthStateType>(initAuthState);
  console.log(authState);

  const updateAuthState = (isLoggedIn: boolean, userData = null) => {
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

  const getUserState = async (refreshToken: string) => {
    try {
      const response = await refreshUserTokens(refreshToken);
      const data = response.data;

      if (response.status === 201) {
        cookies.set('accessToken', data.accessToken);
        cookies.set('refreshToken', data.refreshToken);
        updateAuthState(true, data.user);
      } else {
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
        updateAuthState(false);
      }
    } catch (error) {
      cookies.remove('accessToken');
      cookies.remove('refreshToken');
      updateAuthState(false);
    }
  };

  //페이지 처음 로드시 (새로고침시)
  useEffect(() => {
    //리프레시 토큰으로 액세스 토큰 재발급
    const refreshToken = cookies.get('refreshToken');

    if (refreshToken) {
      getUserState(refreshToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
