require('dotenv').config()
console.log('Chechen app is starting')

const PORT = process.env.PORT || 5000

console.log('2')


const express = require('express')
console.log('3')

const mongoose = require('mongoose')
console.log('4')

const path = require('path');
console.log('5')

const cors = require('cors');
console.log('6')



const authRouter = require('./routes/authRoutes')
console.log('7')

const quizRouter = require('./routes/quizRoute')
console.log('8')

const themeRouter = require('./routes/themeRoute')
console.log('9')

const app = express()
console.log('10')


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('11')
app.use(express.json())
console.log('12')
app.use(cors())
console.log('13')
app.use('/api/auth', authRouter)
console.log('14')
app.use('/api/theme', themeRouter)
console.log('15')
app.use('/api/quiz', quizRouter)
console.log('16')


async function start() {
    try{
        console.log('17')
        await mongoose.connect('mongodb+srv://Admin:Globalforlocal12@cluster0.dqd92.mongodb.net/dictionary?retryWrites=true&w=majority')
        console.log('18')
        app.listen(PORT, ()=>{
            console.log(`server started on port ${PORT}`)
        })
    } catch (err) {console.error(err)}
}

console.log('19')


start();
console.log('20')
