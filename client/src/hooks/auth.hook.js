import {useState, useEffect, useCallback} from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isLogin, setIsLogin] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken
        }));

        setIsLogin(true);
    }, [])

    const logout = () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('userData')
        setIsLogin(false);
    }

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('userData'))
        if(data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return {login, logout, token, userId, isLogin}
}