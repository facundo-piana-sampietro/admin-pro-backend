const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = (req, res, next) => {

    //Leer el Token
    const token = req.header('x-token')

    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { _id } = jwt.verify( token, process.env.JWT_SECRET);

        req._id = _id;
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no válido'
        })
    }
}

const validarADMIN_ROLE = async(req, res, next) => {
    const _id = req._id;
    try {
        const usuarioDB = await Usuario.findById(_id);
        if (!usuarioDB){
            return res.status(500).json({
                ok: false,
                msg: 'Usuario no existente.'
            })  
        }

        if (usuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'El usuario no tiene privilegios para ejecutar la acción.'
            })  
        }

        next();

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}

const validarAdminRoleOMismoUsuario = async(req, res, next) => {
    const _id = req._id; //Id que quiere actualizar
    const id = req.params.id //usuario que quiero actualizar
    try {
        const usuarioDB = await Usuario.findById(_id);
        if (!usuarioDB){
            return res.status(500).json({
                ok: false,
                msg: 'Usuario no existente.'
            })  
        }

        //Para modificar, el usuario tiene que tener Admin Role o se debe querer modificar a él mismo
        if (usuarioDB.role === 'ADMIN_ROLE' || _id === id){
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'El usuario no tiene privilegios para ejecutar la acción.'
            })  
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarAdminRoleOMismoUsuario
}