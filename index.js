const express = require('express')
const mongoose = require('mongoose') 
const authRouter = require('./routes/authRoutes')
const quizRouter = require('./routes/quizRoute')
const app = express()
const PORT = process.env.PORT || 5000
WDS_SOCKET_PORT=0

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/quiz', quizRouter)

async function start() {
    try{
        await mongoose.connect('mongodb+srv://Admin:Globalforlocal12@cluster0.dqd92.mongodb.net/dictionary?retryWrites=true&w=majority')
        app.listen(PORT, ()=>{
            console.log(`server started on port ${PORT}`)
        })
    } catch (err) {console.error(err)}
}

start()