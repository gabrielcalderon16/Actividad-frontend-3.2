const {Router} = require('express')
const { check } = require('express-validator')
const {validarCampos}= require('../middlewares/validar-campos')
const {AddPost, GetPost, PutPost, eliminarPosts} = require('../controllers/posts')

const router = Router()

router.get('/', GetPost)

router.post('/', [
    check('titulo','El nombre es obligatorio').not().isEmpty(),
    check('descripcion','El email es obligatorio').not().isEmpty(),
    check('autor','El paquete es obligatorio').not().isEmpty(),
    validarCampos
], AddPost)

router.put('/:id', [
    check('titulo','El nombre es obligatorio').not().isEmpty(),
    check('descripcion','El email es obligatorio').not().isEmpty(),
    check('autor','El paquete es obligatorio').not().isEmpty(),
    validarCampos
], PutPost)

router.delete('/:id', eliminarPosts);


module.exports = router