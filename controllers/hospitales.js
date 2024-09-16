const { response } = require('express')
const Hospital = require('../models/hospital');

const getHospitales = async(req, res) => {
    
    const hospitales = await Hospital.find()
                            .populate('usuario', 'nombre img')

    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async(req, res) => {

    const id = req.id;
    const hospital = new Hospital ({
        usuario: id,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarHospital = (req, res) => {

    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    })
}

const borrarHospital = (req, res) => {

    res.json({
        ok: true,
        msg: 'borrarHospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,
}