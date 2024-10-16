/*
    Ruta: /api/hospitales
*/
const { Router } = require('express');
const { getHospitales, getHospitalesPaginado, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator')

const router = Router();


router.get( '/', validarJWT, getHospitales);

router.get( '/paginado', validarJWT, getHospitalesPaginado);

router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ], 
    crearHospital
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital
);

router.delete( '/:id', validarJWT, borrarHospital);

module.exports = router;