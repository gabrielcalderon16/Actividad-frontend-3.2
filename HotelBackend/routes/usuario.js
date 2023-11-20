const {Router} = require('express')
const {check} = require('express-validator')
const {getUsuarios, newUsuario, actualizarUsuarios, eliminarUsuario}= require('../controllers/usuario')
const {validarCampos}= require('../middlewares/validar-campos')



const router = Router()

router.get('/', getUsuarios);
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos
]
, newUsuario);

router.put('/:id',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuarios);

router.delete('/:id', eliminarUsuario);

module.exports = router