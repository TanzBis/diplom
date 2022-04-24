import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import AuthPage from './pages/AuthPage/AuthPage'
import RegPage from "./pages/AuthPage/RegPage";


export const useRoutes = (isLogin) => {

    if(isLogin) {
        return (
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<Navigate to="/" />}/>
            </Routes>
        )
    }    
 //для коммита
    return (
        <Routes>
            <Route path="/registration" element={<RegPage/>}/>
            <Route path="/login" element={<AuthPage/>}/>
            <Route path="/" element={<Navigate to="/login" />}/>
        </Routes>
    )
}