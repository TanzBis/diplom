// require('dotenv').config()
console.log('Chechen app is starting')

const PORT = process.env.PORT || 5000

const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors');


const authRouter = require('./routes/authRoutes')
const quizRouter = require('./routes/quizRoute')
const themeRouter = require('./routes/themeRoute')
const app = express()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/theme', themeRouter)
app.use('/api/quiz', quizRouter)

async function start() {
    try{
        await mongoose.connect('mongodb+srv://Admin:Globalforlocal12@cluster0.dqd92.mongodb.net/dictionary?retryWrites=true&w=majority')
        app.listen(PORT, ()=>{
            console.log(`server started on port ${PORT}`)
        })
    } catch (err) {console.error(err)}
}

start();