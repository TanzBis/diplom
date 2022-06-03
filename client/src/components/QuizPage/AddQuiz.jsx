import * as yup from 'yup';
import {useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import styles from './AddQuiz.module.sass'
import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";
import { Navigate } from "react-router-dom";
import {QuizzesApi} from "../../api/api";
import { useLocation } from 'react-router-dom';

const AddQuiz = (props) => {
    const { isLogin, userId } = useContext(AuthContext);
    const { state: { themeId } } = useLocation();

    const initialValues = {
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
    };

    const onSubmit = async (values, actions) => {
        try {
            const response = await QuizzesApi.createQuiz(values, themeId);
            actions.resetForm();
        } catch (err) {
            console.log()
        }
    };

    const validationSchema = yup.object({
        question: yup.string().required('Введите текст вопроса'),
        option1: yup.string().required('Введите вариант ответа'),
        option2: yup.string().required('Введите вариант ответа'),
        option3: yup.string().required('Введите вариант ответа'),
        option4: yup.string().required('Введите вариант ответа'),
    });

    const formik = useFormik({initialValues, onSubmit, validationSchema});

    if (!isLogin) return <Navigate to='/login'/>

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <TextField
                className={styles.input}
                id="question"
                name="question"
                label="вопрос"
                value={formik.values.question}
                onChange={formik.handleChange}
                error={formik.touched.question && Boolean(formik.errors.question)}
                helperText={formik.touched.question && formik.errors.question}
            />
            <TextField
                className={styles.input}
                id="option1"
                name="option1"
                label="вариант 1"
                value={formik.values.option1}
                onChange={formik.handleChange}
                error={formik.touched.option1 && Boolean(formik.errors.option1)}
                helperText={formik.touched.option1 && formik.errors.option1}
            />
            <TextField
                className={styles.input}
                id="option2"
                name="option2"
                label="вариант 2"
                value={formik.values.option2}
                onChange={formik.handleChange}
                error={formik.touched.option2 && Boolean(formik.errors.option2)}
                helperText={formik.touched.option2 && formik.errors.option2}
            />
            <TextField
                className={styles.input}
                id="option3"
                name="option3"
                label="вариант 3"
                value={formik.values.option3}
                onChange={formik.handleChange}
                error={formik.touched.option3 && Boolean(formik.errors.option3)}
                helperText={formik.touched.option3 && formik.errors.option3}
            />
            <TextField
                className={styles.input}
                id="option4"
                name="option4"
                label="вариант 4"
                value={formik.values.option4}
                onChange={formik.handleChange}
                error={formik.touched.option4 && Boolean(formik.errors.option4)}
                helperText={formik.touched.option4 && formik.errors.option4}
            />
            <Button type='submit' variant='contained'>Добавить квиз</Button>
        </form>

    );
};

export default AddQuiz;