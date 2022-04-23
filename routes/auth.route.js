const {Router} = require('express')
const router = Router()
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/User")
const Role = require("../models/Role")
const {secret} = require('./config')


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

router.get('/users',
    async (req, res) => {
        try {
            // const userRole = new Role()
            // const adminRole = new Role({value: 'ADMIN'})
            // await userRole.save()
            // await adminRole.save()
            const users = await User.find()
            res.json(users)
            res.json('server work')
        } catch (e) {
            console.log(e)
        }
    }
)

router.post('/registration',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Некорректный пароль').isLength({min: 6, max: 25})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неккоректные данные при регистрации'
                })
            }
            const {email, password} = req.body

            const isUsed = await User.findOne({email})

            if (isUsed) {
                return res.status(300).json({message: "Данный email уже занят, попробуйте другой"})
            }

            const hashPassword = await bcrypt.hashSync(password, 12)
            const userRole = await Role.findOne({value: "ADMIN"})
            const user = new User({email, password: hashPassword, roles: [userRole.value]})

            await user.save()

            res.status(201).json({message: "Пользователь создан"})
        } catch (error) {
            console.log(error)

        }
    })

router.post('/login',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Некорректный пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неккоректные данные при регистрации'
                })
            }
            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'Такого Email нет в базе данных'})
            }

            const isMatched = bcrypt.compare(password, user.password)

            if (!isMatched) {
                return res.status(400).json({message: 'Пароли не совпадают'})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})

        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Ошибка при регистрации'})
        }

    })

module.exports = router

