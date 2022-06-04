import './App.sass';
import Navbar from './components/Navbar/Navbar.jsx'
import {AuthContext} from './context/AuthContext'
import {useAuth} from './hooks/auth.hook'
import {Route, Routes} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import React from "react";
import MainPage from "./components/MainPage/MainPage";
import AddQuiz from "./components/QuizPage/AddQuiz";
import AddTheme from "./components/Theme/AddTheme";
import Protected from "./components/Auth/Protected";


function App() {
    const {login, logout, token, userId, roles, isLogin} = useAuth()

    return (
        <AuthContext.Provider value={{login, logout, token, userId, roles, isLogin}}>
            <div className="app">
                <Navbar/>
                <div className='app-container'>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/registration" element={<Auth/>}/>
                        <Route path="/login" element={<Auth/>}/>
                        <Route path='/add-quiz' element={<Protected><AddQuiz/></Protected>}/>
                        <Route path='/add-theme' element={<Protected><AddTheme/></Protected>}/>
                    </Routes>
                </div>
            </div>
        </AuthContext.Provider>
    )
}

export default App
 