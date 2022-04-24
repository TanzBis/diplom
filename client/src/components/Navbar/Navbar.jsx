import React, {useContext} from 'react'
import './Navbar.scss'
import {AuthContext} from "../../context/AuthContext";

const Navbar  = () => {
  const {logout, isLogin, login} = useContext(AuthContext)
  return (
    <nav>
        <div className='nav-wrapper navbar green'>
        <a href='/' className='brand-logo'>Learn Chechen</a>
            {
                isLogin
                ? <ul id='nav-mobile' className='right hide-on-med-and-down'>
                <li><a href="/" onClick={logout}>Выйти</a></li>
                </ul>
                : <ul id='nav-mobile' className='right hide-on-med-and-down'>
                <li><a href="/" onClick={login}>Войти</a></li>
                </ul>
            }
        </div>
    </nav>
  )
}

export default Navbar