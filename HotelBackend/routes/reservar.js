const {Router} = require('express')
const { check } = require('express-validator')
const {validarCampos}= require('../middlewares/validar-campos')
const { reservar} = require('../controllers/reservar')

const router = Router()

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('paquete','El paquete es obligatorio').not().isEmpty(),
    validarCampos
], reservar)

module.exports = router