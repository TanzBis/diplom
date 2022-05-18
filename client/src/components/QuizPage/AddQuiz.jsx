import * as yup from 'yup';
import {useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import styles from './AddQuiz.module.sass'
import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";
import { Navigate } from "react-router-dom";
import {QuizzesApi} from "../../api/api";

const AddQuiz = (props) => {
    const { isLogin, userId } = useContext(AuthContext);

    const initialValues = {
        question: '',
        optionOne: '',
        optionTwo: '',
        optionThree: '',
        optionFour: ''
    };

    const onSubmit = async (values, actions) => {
        try {
            const response = await QuizzesApi.createQuiz(values, userId);
            actions.resetForm();


        } catch (err) {
            console.log()
        }
    };

    const validationSchema = yup.object({
        question: yup.string().required('Введите текст вопроса'),
        optionOne: yup.string().required('Введите вариант ответа'),
        optionTwo: yup.string().required('Введите вариант ответа'),
        optionThree: yup.string().required('Введите вариант ответа'),
        optionFour: yup.string().required('Введите вариант ответа'),
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
                id="optionOne"
                name="optionOne"
                label="вариант 1"
                value={formik.values.optionOne}
                onChange={formik.handleChange}
                error={formik.touched.optionOne && Boolean(formik.errors.optionOne)}
                helperText={formik.touched.optionOne && formik.errors.optionOne}
            />
            <TextField
                className={styles.input}
                id="optionTwo"
                name="optionTwo"
                label="вариант 2"
                value={formik.values.optionTwo}
                onChange={formik.handleChange}
                error={formik.touched.optionTwo && Boolean(formik.errors.optionTwo)}
                helperText={formik.touched.optionTwo && formik.errors.optionTwo}
            />
            <TextField
                className={styles.input}
                id="optionThree"
                name="optionThree"
                label="вариант 3"
                value={formik.values.optionThree}
                onChange={formik.handleChange}
                error={formik.touched.optionThree && Boolean(formik.errors.optionThree)}
                helperText={formik.touched.optionThree && formik.errors.optionThree}
            />
            <TextField
                className={styles.input}
                id="optionFour"
                name="optionFour"
                label="вариант 4"
                value={formik.values.optionFour}
                onChange={formik.handleChange}
                error={formik.touched.optionFour && Boolean(formik.errors.optionFour)}
                helperText={formik.touched.optionFour && formik.errors.optionFour}
            />
            <Button type='submit' variant='contained'>Добавить квиз</Button>
        </form>

    );
};

export default AddQuiz;