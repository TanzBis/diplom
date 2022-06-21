import {Box, Button, Card, CardContent, CardMedia, LinearProgress, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from './Quizzes.module.sass'

const Quizzes = () => {
    const {state} = useLocation();
    const {quizzes} = state;
    const [quizNumber, setQuizNumber] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const progress = (100 / quizzes.length) * (quizNumber + 1);
        setProgress(progress);
    }, [quizNumber, quizzes.length])

    let currentQuiz = quizzes[quizNumber];

    return (
        <Box display='flex' sx={{fontSize: 28}} flexDirection='column' alignItems='center'>
            <LinearProgress sx={{ width: "80%", height: '10px', borderRadius: 2}} variant="determinate" value={progress}/>
            <Typography className={styles.question} variant='h5' mb={2}>{currentQuiz.question}</Typography>
            <Box className={styles.cardBox} display='flex' flexWrap='wrap'>
                {currentQuiz.options.map(option => (
                    <Card
                        className={styles.card}
                        key={option._id}>
                        <CardMedia
                            className={styles.cardImg}
                            component='img'
                            image={option.picture}
                        />
                        <CardContent sx={{padding: 0, paddingBottom: 0}}>
                            <Typography className={styles.answer} gutterBottom variant="h5" component="div" textAlign='center'>
                                {option.text}
                            </Typography>
                           <audio controls src={option.audio}>

                           </audio>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            {quizNumber + 1 < quizzes.length &&
                <Button onClick={() => setQuizNumber(quizNumber + 1)}>Следующий квиз</Button>
            }
        </Box>
    );
};

export default Quizzes;