import axios from 'axios';
import { refreshUserTokens } from './UserAPI';
import { Cookies } from 'react-cookie';
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS
} from '../constants/Token';

const tokenInstance = axios.create({
  timeout: 10000
});

const cookies = new Cookies();

tokenInstance.interceptors.request.use(async (config) => {
  //액세스 토큰이 없는(만료된) 경우 리프레시 토큰으로 토큰 재발급
  //*프론트 액세스 토큰 쿠키 유효 기간과 서버 액세스 토큰 유효 기간이 같아야 함
  let accessToken: string = cookies.get('accessToken');
  let refreshToken: string = cookies.get('refreshToken');

  if (!accessToken) {
    try {
      const response = await refreshUserTokens(refreshToken);
      const data = response.data;
      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
      cookies.set('accessToken', accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
      cookies.set('refreshToken', refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
    } catch (err) {
      //액세스 토큰 재발급 실패시
      //(리프레시 토큰도 유효하지 않거나 만료된 경우)
      //액세스, 리프레시 토큰 쿠키에서 삭제
      cookies.remove('accessToken', { path: '/' });
      cookies.remove('refreshToken', { path: '/' });
      return Promise.reject(err);
    }
  }

  //액세스 토큰을 헤더에 담아 요청 보내기
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default tokenInstance;
