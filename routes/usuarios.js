/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator')
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarADMIN_ROLE, validarAdminRoleOMismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/', validarJWT, getUsuarios);

router.post( '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ], 
    crearUsuarios
);

router.put( '/:id',
    [
        validarJWT, //--> Va primero para que no valide toda una request en vano si no esta autenticado.
        validarAdminRoleOMismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    actualizarUsuario
);

router.delete( '/:id', [validarJWT, validarADMIN_ROLE], borrarUsuario);

module.exports = router;