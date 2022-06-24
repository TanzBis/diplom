const {Router} = require('express');
const slugify = require('slugify');
const Theme = require('../models/Theme');
const {upload} = require('../multer');

const router = Router();

router.post('/', upload.single('picture'), async (req, res) => {
    try {
        const {name, author} = req.body;
        const slug = slugify(name, { lower: true });
        const picture = req.protocol + '://' + req.get('host') + '/uploads/themes/pictures/' + req.file.filename;

        await Theme.create({ name, slug, author, picture});

        res.json({message: 'Тема добавлена'});
    } catch (e) {
        console.log(e);
    }
});

router.get('/', async (req, res) => {
    try {
        const themes = await Theme.find().populate('quizzes');

        res.json(themes)
    } catch (e) {
        console.log(e)
    }
});

router.get('/:slug', async (req, res) => {
    try {
        const {slug} = req.params;
        const theme = await Theme.findOne({slug}).populate('quizzes');

        res.json(theme)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const theme = await Theme.findOneAndDelete({_id: req.params.id})
        res.json(theme)
    } catch (e) {
        console.log(e);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const theme = await Theme.findOneAndUpdate({_id: req.params.id})
        res.json(theme)
    } catch (e) {
        console.log(e);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const theme = await Theme.findOneAndReplace({_id: req.params.id})
        res.json(theme)
    } catch (e) {
        console.log(e);
    }
});

module.exports = router