import * as yup from 'yup';
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import styles from './AddTheme.module.sass'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {ThemesApi} from "../../api/api";

const Form = ({ getThemes }) => {
    const { isLogin, userId } = useContext(AuthContext);

    const initialValues = {
        name: '',
        picture: ''
    };

    const onSubmit = async (values, actions) => {
        try {
            const response = await ThemesApi.createTheme(values, userId);
            actions.resetForm();

            getThemes();

        } catch (err) {
            console.log()
        }
    };

    const validationSchema = yup.object({
        name: yup.string().required('Введите тему'),
    });

    const formik = useFormik({initialValues, onSubmit, validationSchema});

    if (!isLogin) return <Navigate to='/login'/>

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <TextField
                className={styles.input}
                id="name"
                name="name"
                label="тема"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />

            <Button type='submit' variant='contained'>Добавить тему</Button>
        </form>

    );
}

export default Form;