import axios from 'axios';
import { refreshUserTokens } from './user';
import { Cookies } from 'react-cookie';
import { useAuthState } from '../contexts/AuthContext';

const tokenInstance = axios.create({
  timeout: 10000
});

const cookies = new Cookies();
const { setAuthState } = useAuthState();

let accessToken: string = cookies.get('accessToken');
let refreshToken: string = cookies.get('refreshToken');

//요청시 헤더에 액세스 토큰 담기
tokenInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

//액세스 토큰 만료 응답시 리프레시 토큰으로 액세스 토큰 재발급
tokenInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const response = await refreshUserTokens(refreshToken);
        const data = response.data;

        //액세스 토큰 업데이트 (쿠키)
        accessToken = data.accessToken;
        refreshToken = data.refreshToken;

        //새로운 액세스 토큰으로 재시도
        const config = error.config;
        config.headers.Authorization = `Bearer ${accessToken}`;

        return tokenInstance(config);
      } catch (err) {
        //액세스 토큰 재발급 실패시
        //(리프레시 토큰도 유효하지 않거나 만료된 경우)

        //액세스, 리프레시 토큰 쿠키에서 삭제
        cookies.remove('accessToken', { path: '/' });
        cookies.remove('refreshToken', { path: '/' });
        //전역 상태 업데이트
        setAuthState((prev) => ({
          ...prev,
          isLoggedIn: false,
          user: null
        }));

        return Promise.reject(err);
      }
    }

    //401 에러가 아닌 다른 에러인 경우
    return Promise.reject(error);
  }
);

export default tokenInstance;
