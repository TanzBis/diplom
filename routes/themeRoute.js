const {Router} = require('express');
const router = Router();
const Theme = require('../models/Theme');
const {upload} = require('../multer');

router.post('/', upload.single('picture'), async (req, res) => {
    try {
        const {body} = req;

        await Theme.create({
            name: body.name,
            author: body.author,
            picture: req.protocol + '://' + req.get('host') + '/uploads/themes/pictures/' + req.file.filename
        });

        res.json({message: 'Тема добавлена'});
    } catch (e) {
        console.log(e);
    }
});

router.get('/', async (req, res) => {
    try {
        const themes = await Theme.find();

        res.json(themes)
    } catch (e) {
        console.log(e)
    }
});

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