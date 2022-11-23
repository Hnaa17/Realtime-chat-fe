import React, {useEffect, useState} from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import ChatList from'./pages/Chat/ChatList.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import useWindowDimensions from './components/window-size/WindowSize.jsx';
import ListFriends from './pages/mobile/ListFriends.jsx';

function App () {
  const { height, width } = useWindowDimensions();

  return (
    <>
    {width >= 992 ? (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace="true" />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/chat' element={<ChatList />}/>
        </Routes>
      </BrowserRouter>
    ) : (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace="true" />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/chat' element={<ListFriends />}/>
        </Routes>
      </BrowserRouter>
    )}
  </>
  );
}

export default App;