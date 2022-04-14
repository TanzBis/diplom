const express = require('express')
const mongoose = require('mongoose') 

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.route'))

async function start() {
    try{
        await mongoose.connect('mongodb+srv://Admin:Globalforlocal12@cluster0.dqd92.mongodb.net/dictionary?retryWrites=true&w=majority')
        app.listen(PORT, ()=>{
            console.log(`server started on port ${PORT}`)
        })
    } catch (err) {console.error(err)}
}

start()