const {Router} = require('express')
const router = Router()
const Quiz = require('../models/Quiz')
const Theme = require('../models/Theme')
const {upload} = require("../multer");

const uploadFields = [
    {name: 'picture1'}, {name: 'picture2'}, {name: 'picture3'}, {name: 'picture4'},
    {name: 'audio1'}, {name: 'audio2'}, {name: 'audio3'}, {name: 'audio4'}
];

router.post('/', upload.fields(uploadFields), async (req, res) => {
    try {
        const {question, themeId} = req.body;

        const options = [];

        for (let i = 1; i < 5; i++) {
            let obj = {
                text: req.body[`option${i}`],
                picture: req.protocol + '://' + req.get('host') + '/uploads/quizzes/pictures/' + req.files[`picture${i}`][0].filename,
                audio: req.protocol + '://' + req.get('host') + '/uploads/quizzes/audios/' + req.files[`audio${i}`][0].filename
            }

            options.push(obj);
        }

        const quiz = await Quiz.create({question, options});

        await Theme.findOneAndUpdate(
            {_id: themeId},
            {$push: {quizzes: quiz}}
        );

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