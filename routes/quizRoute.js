const {Router} = require('express')
const router = Router()
const Quiz = require('../models/Quiz')

router.post('/', async (req, res) => {
    try {
        const {data, userId} = req.body;
        console.log(req)

        const quiz = await new Quiz({
            ...data,
            author: userId
        });

        await quiz.save();

        res.json(quiz);
    } catch (e) {
        console.log(e);
    }
});

router.get('/', async (req, res)=> {
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