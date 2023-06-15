import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ROUTER from './constants/Router';
import Auth from './components/common/Auth/Auth';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPage from './pages/MyPage';
import UserEdit from './pages/UserEdit';
import DestinationList from './pages/DestinationList';
import ScheduleDetail from './pages/ScheduleDetail';
import ScheduleEdit from './pages/ScheduleEdit';
import LikesScheduleList from './pages/LikesScheduleLists';
import RecentScheduleList from './pages/RecentScheduleLists';
import LikedScheduleList from './pages/LikedScheduleLists';
import MyScheduleList from './pages/MyScheduleList';
import MyReview from './pages/MyReview';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import DestinationDetails from './components/DestinationList/DestinationDetails';
import NotFound from './pages/NotFound';

function App() {
  {
    /* 
    Main: 메인 페이지
    Login: 로그인 페이지
    Register: 회원가입 페이지
    MyPage: 마이페이지 (회원정보 조회)
    UserEdit: 회원정보 수정
    ScheduleDetail: 일정 상세 페이지
    ScheduleList: 일정 리스트 조회 페이지 (남꺼)
    MyScheduleList: 일정 리스트 조회 페이지 (내꺼)
    DestinationList: 목적지 리스트
  */
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path={ROUTER.MAIN} element={<Main />} />
          <Route
            path={ROUTER.LOGIN}
            element={
              <Auth required={false}>
                <Login />
              </Auth>
            }
          />
          <Route
            path={ROUTER.REGISTER}
            element={
              <Auth required={false}>
                <Register />
              </Auth>
            }
          />
          <Route
            path={ROUTER.MYPAGE}
            element={
              <Auth required={true}>
                <MyPage />
              </Auth>
            }
          />
          <Route
            path={ROUTER.MYPAGE_EDIT}
            element={
              <Auth required={true}>
                <UserEdit />
              </Auth>
            }
          />
          <Route path={ROUTER.DESTINATION_LIST} element={<DestinationList />}>
            <Route
              path={ROUTER.DESTINATION_LIST_DETAILS_PARAMS}
              element={<DestinationDetails />}
            />
          </Route>
          <Route
            path={`${ROUTER.SCHEDULE_LIST}/likes`}
            element={<LikesScheduleList />}
          />
          <Route
            path={`${ROUTER.SCHEDULE_LIST}/recent`}
            element={<RecentScheduleList />}
          />
          <Route
            path={`${ROUTER.SCHEDULE_LIST}/liked`}
            element={
              <Auth required={true}>
                <LikedScheduleList />
              </Auth>
            }
          />
          <Route
            path={`${ROUTER.SCHEDULE_EDIT}/:scheduleId`}
            element={
              <Auth required={true}>
                <ScheduleEdit />
              </Auth>
            }
          />
          <Route
            path={`${ROUTER.SCHEDULE_DETAIL}/:scheduleId`}
            element={<ScheduleDetail />}
          />
          <Route
            path={ROUTER.MYSCHEDULE_LIST}
            element={
              <Auth required={true}>
                <MyScheduleList />
              </Auth>
            }
          />
          <Route
            path={ROUTER.MYREVIEW}
            element={
              <Auth required={true}>
                <MyReview />
              </Auth>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
