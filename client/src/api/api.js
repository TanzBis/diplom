import axios from "axios";

export const QuizzesApi = {
    getQuizzes: () => axios.get('/api/quiz'),
    createQuiz: (payload, themeId) => {
        const { option1, option2, option3, option4, question  } = payload;
        const options = [ option1, option2, option3, option4 ];

        return axios.post('/api/quiz', {question, options, theme: themeId})
    },
};

export const ThemesApi = {
    getThemes: () => axios.get('/api/theme'),
    createTheme: (data, author) => axios.post('/api/theme', {data, author}),
};

export const AuthApi = {
    login: payload => axios.post('/api/auth/login', {...payload}),
    registration: payload => axios.post('/api/auth/registration', {...payload}),
};