/*
    Ruta: /api/medicos
*/
const { Router } = require('express');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicoById } = require('../controllers/medicos');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/', validarJWT, getMedicos);

router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ], 
    crearMedico
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.delete( '/:id', validarJWT, borrarMedico);

router.get( '/:id', validarJWT, getMedicoById);

module.exports = router;