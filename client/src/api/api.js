import axios from "axios";

export const QuizzesApi = {
    getQuizzes: () => axios.get('/api/quiz'),
    createQuiz: (payload, userId) => axios.post('/api/quiz', {data: payload, userId}),
};

export const ThemesApi = {
    getThemes: () => axios.get('/api/theme'),
    createTheme: (payload, userId) => axios.post('/api/theme', {data: payload, userId}),
};

export const AuthApi = {
    login: payload => axios.post('/api/auth/login', {...payload}),
    registration: payload => axios.post('/api/auth/registration', {...payload}),
};