const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult } = require('express-validator')
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

class authController{
            async registration(req, res) {
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
                    const userRole = await Role.findOne({value: "USER"})
                    const user = new User({email, password: hashPassword, roles: [userRole.value]})

                    await user.save()

                    res.status(201).json({message: "Пользователь создан"})
                } catch (error) {
                    console.log(error)

                }
            }

            async login(req, res) {
                try {
                    const {email, password} = req.body
                    const user = await User.findOne({email})
                    if (!user) {
                        return res.status(400).json({message: 'Неверный пароль или email'})
                    }
                    const isMatched = bcrypt.compareSync(password, user.password)
                    if (!isMatched) {
                        return res.status(400).json({message: 'Неверный пароль или email'})
                    }
                    const token = generateAccessToken(user._id, user.roles)
                    return res.json({token, userId: user._id})

                } catch (error) {
                    console.log(error)
                    res.status(400).json({message: 'Ошибка при регистрации'})
                }

            }

            async getUsers(req, res) {
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
}
module.exports = new authController()


