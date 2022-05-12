import axios from "axios";

export const QuizzesApi = {
    getQuizzes: () => axios.get('/api/quiz'),
};

export const AuthApi = {
    login: payload => axios.post('/api/auth/login', {...payload}),
    registration: payload => axios.post('/api/auth/registration', {...payload}),
};