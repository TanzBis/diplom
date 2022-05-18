const {Router} = require('express')
const router = Router()
const Theme = require('../models/Theme')

router.post('/', async (req, res) => {
    try {
        const {data, userId} = req.body;

        const theme = await new Theme({
            ...data,
            author: userId
        });

        await theme.save();

        res.json({message: 'Тема добавлена'});
    } catch (e) {
        console.log(e);
    }
});

router.get('/', async (req, res)=> {
    try {
        const {userId} = req.body
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



//ЗДЕСЬ СУПЕР ВАЖНЫЙ МОМЕНТ

module.exports = router