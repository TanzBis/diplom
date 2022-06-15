const {Router} = require('express')
const router = Router()
const controller = require('../controllers/authController');
const {check} = require('express-validator')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/registration', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Некорректный пароль').isLength({min: 8, max: 25})],controller.registration)
router.post('/login', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Некорректный пароль').exists()],controller.login)
router.get('/users', roleMiddleware(['USER']), controller.getUsers)


module.exports = router;