import React, {useState, useContext} from 'react'
import './AuthPage.scss'
import { Link } from 'react-router-dom';
              import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'


export default function AuthPage() {
  const [form, setForm] = useState({
    email: '',
    password: '', 
  })

  const { login } = useContext(AuthContext)

  const changeHundler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const loginHundler = async () => {
    try {
      await axios.post('/api/auth/login', {...form}, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        login(response.data.token, response.data.userId)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <div className="container">
            <div className="auth-page">
                <h3>Авторизация</h3>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                  <div className="row">
                    <div className="input-field col s12">
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        className="validate"
                        onChange={changeHundler}
                      />
                    </div>
                    <div className="input-field col s12">
                      <label htmlFor="password">Пароль</label>
                      <input 
                        type="password" 
                        name="password" 
                        className="validate"
                        onChange={changeHundler}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <button className="wawes-effect wawes-light btn btn green"
                    onClick={loginHundler}>
                    Войти
                    </button>
                    <Link to="/registration"className="btn-outline btn-reg">У вас еще нет аккаунта?</Link>
                  </div>
                </form>
            </div>
        </div>
  )
}

