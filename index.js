const express = require('express')
const mongoose = require('mongoose') 
const authRouter = require('./routes/auth.route')
const app = express()
const PORT = process.env.PORT || 5000
WDS_SOCKET_PORT=0

app.use(express.json())
app.use('/api/auth', authRouter)

async function start() {
    try{
        await mongoose.connect('mongodb+srv://Admin:Globalforlocal12@cluster0.dqd92.mongodb.net/dictionary?retryWrites=true&w=majority')
        app.listen(PORT, ()=>{
            console.log(`server started on port ${PORT}`)
        })
    } catch (err) {console.error(err)}
}

start()