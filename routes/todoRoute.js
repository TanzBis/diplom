const {Router} = require('express')
const router = Router()
const Todo = require('../models/Todo')

router.post('/add', async (req, res) => {
    try {
        const {text, userId} = req.body;
        console.log(req)

        const todo = await new Todo({
            text,
            owner: userId,
            completed: false,
            important: false
        });


        await todo.save();

        res.json(todo);
    } catch (e) {
        console.log(e);
    }
})

router.get('/', async (req, res)=> {
    try {
        const {userId} = req.query

        const todo = await Todo.find({owner: userId})

        res.json(todo)

    } catch (e) {
        console.log(e)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({_id: req.params.id})
        res.json(todo)
    } catch (e) {
        console.log(e);
    }
})
//ЗДЕСЬ СУПЕР ВАЖНЫЙ МОМЕНТ ОБРАТИ ВНИМАНИЕ

module.exports = router