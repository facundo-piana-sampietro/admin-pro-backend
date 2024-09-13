const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {
    
    const usuarios = await Usuario.find({}, 'nombre email role google');
    
    res.json({
        ok: true,
        usuarios,
        id: req.id
    });
}

const crearUsuarios = async (req, res = response) => {
    
    const {email, password} = req.body
    
    try{
        const existeEmail = await Usuario.findOne({ email })

        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync (password, salt)


        await usuario.save();

        //Crear token JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error){
        
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        })
    }
}

const actualizarUsuario = async (req, res = response) => {
    const id = req.params.id
    
    try{
        const usuarioDB = await Usuario.findById(id);
        if (!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        const { password, google, email, ...campos} = req.body;

        if (usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({ email })

            if (existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está registrado'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndDelete( id, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        })
    }
}

const borrarUsuario = async (req, res) => {
    
    const id = req.params.id;

    try{


        const usuarioDB = await Usuario.findById(id);

        if (!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }
        await Usuario.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    } catch (error){
        
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}