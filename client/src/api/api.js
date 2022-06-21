import axios from "axios";
import { getFormDataFromPlainObj } from "../utils";

export const QuizzesApi = {
    getQuizzes: () => axios.get('/api/quiz'),
    createQuiz: payload => {
        const formData = getFormDataFromPlainObj(payload);

        return axios.post('/api/quiz', formData);
    },
};

export const ThemesApi = {
    getThemes: () => axios.get('/api/theme'),
    createTheme: (data, author) => {
        const tempData = {...data, author};
        const formData = getFormDataFromPlainObj(tempData);

        return axios.post('/api/theme', formData);
    },
};

export const AuthApi = {
    login: payload => axios.post('/api/auth/login', {...payload}),
    registration: payload => axios.post('/api/auth/registration', {...payload}),
};