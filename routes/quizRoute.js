const {Router} = require('express')
const router = Router()
const Quiz = require('../models/Quiz')
const Option = require('../models/Option')
const {Types} = require("mongoose");

router.post('/', async (req, res) => {
    try {
        const {question, themeId, options} = req.body;

        const quiz = await new Quiz({
            question, theme: themeId, options
        });

        await quiz.save();

        res.json({message: 'Квиз добавлен'});
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