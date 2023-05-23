
import React, { useContext, useEffect, useReducer, useState, createContext } from 'react';
import {BrowserRouter, Routes, Route, useNavigate, Navigate, Outlet} from "react-router-dom";
import NavBar from './components/NavBar'
import paths from './paths/paths'
import Login from './pages/Login';
import Register from './pages/Register';
import {UserContext, UserOauthContext} from "./context/UserContext";
import GetTodos from './components/GetTodos';
import GetOAuthTodos from './components/GetOAuthTodos';


function App() {
  const [jwt, setJwt] = useState<string | null>(null)
  const [OAuthuser, setOauthUser] = useContext(UserOauthContext)



  useEffect (() => {
    const userToken: { token: string } | null = JSON.parse(localStorage.getItem('userToken') || 'null');
    setJwt(userToken)
}, [])

  return (
    <>
   <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path={paths.REGISTER} element={!jwt ? <Register /> : <Navigate to={paths.HOME} /> } />
      <Route path={paths.LOGIN} element={!jwt ? <Login /> : <Navigate to={paths.HOME} />} />
      <Route path={paths.HOME} element={jwt ? <GetTodos /> : <Navigate to={paths.LOGIN} />} />
      <Route path={paths.OAuthTodo} element={ <GetOAuthTodos />}/>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
