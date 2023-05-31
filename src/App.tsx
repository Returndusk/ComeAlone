import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPage from './pages/MyPage';
import UserEdit from './pages/UserEdit';
import DestinationList from './pages/DestinationList';
import ScheduleDetail from './pages/ScheduleDetail';
import ScheduleEdit from './pages/ScheduleEdit';
import ScheduleList from './pages/ScheduleList';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';

function App() {
  {
    /* 
    Main: 메인 페이지
    Login: 로그인 페이지
    Register: 회원가입 페이지
    MyPage: 마이페이지 (회원정보 조회)
    UserEdit: 회원정보 수정
    ScheduleDetail: 일정 상세 페이지
    ScheduleList: 일정 리스트 조회 페이지 (내꺼/남꺼)
    DestinationList: 목적지 리스트
  */
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage/edit' element={<UserEdit />} />
        <Route path='/destination/list' element={<DestinationList />} />
        <Route path='/schedule/list' element={<ScheduleList />} />
        <Route path='/schedule/edit' element={<ScheduleEdit />} />
        <Route path='/schedule/detail' element={<ScheduleDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
