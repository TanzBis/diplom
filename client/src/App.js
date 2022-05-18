import './App.sass';
import Navbar from './components/Navbar/Navbar.jsx'
import {AuthContext} from './context/AuthContext'
import {useAuth} from './hooks/auth.hook'
import {Route, Routes} from "react-router-dom";
import AuthPage from "./components/AuthPage/AuthPage";
import React from "react";
import MainPage from "./components/MainPage/MainPage";
import AddQuiz from "./components/QuizPage/AddQuiz";
import AddTheme from "./components/Theme/AddTheme";


function App() {
    const {login, logout, token, userId, isReady} = useAuth()
    const isLogin = !!token

    return (
        <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
            <div className="app">
                <Navbar/>
                <div className='app-container'>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/registration" element={<AuthPage/>}/>
                        <Route path="/login" element={<AuthPage/>}/>
                        <Route path='/add-quiz' element={<AddQuiz/>}/>
                        <Route path='/add-theme' element={<AddTheme/>}/>
                    </Routes>
                </div>
            </div>
        </AuthContext.Provider>
    )
}

export default App
 