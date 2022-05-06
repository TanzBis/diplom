import React, {useCallback, useContext, useState} from 'react'
import axios from 'axios'

import './MainPage.scss'
import {AuthContext} from "../../context/AuthContext";


export default function MainPage() {
    // const { isLogin } = useContext(AuthContext)
    const [text, setText] = useState('')
    const {userId} = useContext(AuthContext)
    const [todos, setTodos] = useState([])
    //важный момент обрати внимание
    const getTodo = useCallback( async () => {
        try {
            await axios.get('/api/todo', {
                headers: {'Content-Type': 'application/json'},
                params: {userId}
            })
                .then((response) => setTodos(response.data))
        } catch (error){
            console.log(error)
        }
    })

    const createTodo = useCallback(async () => {
            if(!text) return null
            try {
                await axios.post('/api/todo/add', {text, userId}, {
                    headers: {'Content-Type': 'application/json'}
                })
                    .then((response) => {
                        setTodos([...todos, response.data])
                        setText('')
                        getTodo()
                    })
            } catch (error) {
                console.log(error)
            }
        }, [text, userId, todos, getTodo]
    )

    const removeTodo = useCallback(async (id) => {
            try{
                await axios.delete(`/api/todo/delete/${id}`, {id}, {
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(()=> getTodo())
            }catch (e) {
                console.log(e);
            }
    }, [getTodo()])

    return (
        <div className="container">
            <div className="main-page">
                <h4>Добавить слово</h4>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                id="text"
                                name="input"
                                className="validate"
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                            <label htmlFor="input">Задача:</label>
                        </div>
                    </div>
                    <div className="row">
                        <button
                            className="waves-effect waves-light btn green"
                            onClick={createTodo}
                        >Добавить
                        </button>
                    </div>
                </form>

                <h3>Добавленные слова:</h3>
                <div className="todos">
                    {
                        todos.map((todo, index)=> {
                            return (
                                <div className="row flex todos-item" key={index}>
                                    <div className="col todos-num">{index + 1}</div>
                                    <div className="col todos-text">{todo.text}</div>
                                    <div className="col todos-buttons">
                                        <i className="material-icons red-text"
                                        onClick={()=> removeTodo(todo._id)}
                                        >delete</i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
