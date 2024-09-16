const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const fs = require('fs');



const fileUpload = async(req, res = response) => {
    
    const {tipo, id} = req.params

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg: 'No es un médico, usuario u hospital'
        })
    }

    //Validar que existan un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        })
    }

    const file = req.files.imagen //Tenemos acceso a files gracias al middleware establecido en el route.

    const nombreCortado = file.name.split('.') 
    const extensionArchivo = nombreCortado [nombreCortado.length - 1 ];

    //Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']
    if (!extensionArchivo.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg: 'No es un extensión permitida'
        })
    }

    //Generar nombre de archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    const uploadPath = path.join(__dirname, '../uploads/', tipo, nombreArchivo);

    await file.mv( uploadPath , (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg: 'Error al mover la imagen'
            })
        }
    })

    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
        ok: true,
        msg: 'Archivo subido',
        nombreArchivo
    })
    
}

const retornaImagen = (req, res = response) => {
    const {tipo, foto} = req.params;

    let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //Imagen por defecto
    if (!fs.existsSync(pathImg)){
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    }
    res.sendFile( pathImg );
}

module.exports = {
    fileUpload,
    retornaImagen
}
