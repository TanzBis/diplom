const {Router} = require('express')
const router = Router()
const Quiz = require('../models/Quiz')
const Theme = require('../models/Theme')

router.post('/', async (req, res) => {
    try {
        const {question, themeId, options} = req.body;

        const quiz = await Quiz.create({question, options});

        const theme = await Theme.findOneAndUpdate(
            { _id: themeId },
            { $push: { quizzes: quiz }}
        );

        console.log(theme);

        res.json(quiz);
    } catch (e) {
        console.log(e);
    }
});

router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();

        res.json(quizzes)
    } catch (e) {
        console.log(e)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findOneAndDelete({_id: req.params.id})
        res.json(quiz)
    } catch (e) {
        console.log(e);
    }
});


//ЗДЕСЬ СУПЕР ВАЖНЫЙ МОМЕНТ

module.exports = router