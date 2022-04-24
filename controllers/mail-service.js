require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
    }
)

const mailOptions = {
    from: 'tanzbis81@gmail.com',
    to: 'tanzbis81@gmail.com',
    subject: 'Письмо отправленное через Node.js',
    text: 'Текст письма'
}

transporter.sendMail(mailOptions)