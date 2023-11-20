const {Router} = require('express')
const { check } = require('express-validator')
const {validarCampos}= require('../middlewares/validar-campos')
const  {AddHabitacion, GetHabitacion, PutHabitacion, eliminarHabitacions}= require('../controllers/habitacion')

const router = Router()

router.get('/', GetHabitacion)

router.post('/', [
    check('name','El name es obligatorio').not().isEmpty(),
    check('slug','El slug es obligatorio').not().isEmpty(),
    check('type','El type es obligatorio').not().isEmpty(),
    check('price','El price es obligatorio').not().isEmpty(),
    check('capacity','El capacity es obligatorio').not().isEmpty(),
    check('descripcion','El description es obligatorio').not().isEmpty(),
    validarCampos
], AddHabitacion)

router.put('/:id', [
    check('name','El name es obligatorio').not().isEmpty(),
    check('slug','El slug es obligatorio').not().isEmpty(),
    check('type','El type es obligatorio').not().isEmpty(),
    check('price','El price es obligatorio').not().isEmpty(),
    check('capacity','El capacity es obligatorio').not().isEmpty(),
    check('descripcion','El description es obligatorio').not().isEmpty(),
    validarCampos
], PutHabitacion)

router.delete('/:id', eliminarHabitacions);


module.exports = router