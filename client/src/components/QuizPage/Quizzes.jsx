import {Box, Button, Card, CardContent, CardMedia, LinearProgress, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from './Quizzes.module.sass'
import {useQuery} from "react-query";
import {ThemesApi} from "../../api/api";

const Quizzes = () => {
    const {slug} = useParams();
    const {isLoading, isError, data, error} = useQuery(["theme", slug], () => ThemesApi.getThemeBySlug(slug));
    const [quizNumber, setQuizNumber] = useState(0);
    const [progress, setProgress] = useState(0);
    let quizzes;

    useEffect(() => {
        if (data) {
            const progress = (100 / quizzes.length) * (quizNumber + 1);
            setProgress(progress);
        }
    }, [quizNumber])

    if (isLoading) return <p>Загрузка...</p>;
    if (isError) return <p>Возникла ошибка при загрузке данных (</p>

    quizzes = data.data.quizzes;

    let currentQuiz = quizzes[quizNumber];

    return (
        <Box display='flex' sx={{fontSize: 28}} flexDirection='column' alignItems='center'>
            {quizzes.length > 0
                ? <>
                    <LinearProgress sx={{width: "100%", height: '10px', borderRadius: 2}} variant="determinate"
                                    value={progress}/>
                    <Typography className={styles.question} variant='h5' mb={2}>{currentQuiz.question}</Typography>
                    <Box className={styles.cardBox} display='flex' flexWrap='wrap'>
                        {currentQuiz.options.map(option => (
                            <Card
                                className={styles.card}
                                key={option._id}
                                onClick={() => alert(option.text === currentQuiz.correctAnswer)}
                            >
                                {option.picture && <CardMedia
                                    className={styles.cardImg}
                                    component='img'
                                    image={option.picture}
                                />}
                                <CardContent className={styles.content} sx={{padding: 0, paddingBottom: 0}}>
                                    <Typography className={styles.answer} gutterBottom variant="h5" component="div"
                                                textAlign='center'>
                                        {option.text}
                                    </Typography>
                                    {option.audio && <audio controls src={option.audio}></audio>}
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                    {quizNumber + 1 < quizzes.length &&
                        <Button onClick={() => setQuizNumber(quizNumber + 1)}>Следующий квиз</Button>
                    }
                </>
                : <p>Квизы еще не добавлены</p>
            }
        </Box>
    );
};

export default Quizzes;