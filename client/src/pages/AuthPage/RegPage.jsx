import React, {useState} from 'react'
import './AuthPage.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default function RegPage() {

  const [form, setForm] = useState({
    email: '',
    password: '', 
  })

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
    console.log(event.target.name, ' - ', event.target.value);
  }
  
  const registerHandler = async () => {
    try {
      await axios.post('/api/auth/registration', {...form}, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => console.log(response))
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <div className="container">
            <div className="auth-page">
                <h3>Регистрация</h3>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                  <div className="row">
                    <div className="input-field col s12">
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        className="validate"
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="input-field col s12">
                      <label htmlFor="password">Пароль</label>
                      <input 
                        type="password" 
                        name="password" 
                        className="validate"
                        onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <button 
                    className="wawes-effect wawes-light btn btn green" 
                    onClick={registerHandler}>
                    Регистрация
                    </button>
                    <Link to="/login" className="btn-outline btn-reg">У вас уже есть аккаунт?</Link>
                  </div>
                </form>
            </div>
        </div>
  )
}

