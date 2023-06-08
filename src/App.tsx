import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import ScheduleList from './pages/ScheduleList';
import MyScheduleList from './pages/MyScheduleList';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import DestinationDetails from './components/DestinationList/DestinationDetails';

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
        <Route path={ROUTER.SCHEDULE_LIST} element={<ScheduleList />} />
        <Route path={ROUTER.MYSCHEDULE_LIST} element={<MyScheduleList />} />
        <Route path={ROUTER.SCHEDULE_EDIT} element={<ScheduleEdit />} />
        <Route path={ROUTER.SCHEDULE_DETAIL} element={<ScheduleDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
