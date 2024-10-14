const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {
    
    const desde = Number(req.query.desde) || 0

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),

        Usuario.countDocuments()
    ]);
    
    res.json({
        ok: true,
        usuarios,
        _id: req._id,
        total
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
        const token = await generarJWT(usuario._id);

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
    const _id = req.params.id
    
    try{
        const usuarioDB = await Usuario.findById(_id);
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

        if ( !usuarioDB.google ){
            campos.email = email;
        } else if (usuarioDB.email !== email){
            return res.status(400).json({
                ok: false,
                msg: 'Los usuarios de google no pueden cambiar los usuarios.'
            })
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( _id, campos, { new: true } );

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
    
    const _id = req.params.id;

    try{
        const usuarioDB = await Usuario.findById(_id);

        if (!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese _id'
            })
        }
        await Usuario.findByIdAndDelete( _id );

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