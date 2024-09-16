const { response } = require('express')
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {
    
    const hospitales = await Hospital.find()
                            .populate('usuario', 'nombre img')

    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async(req, res = response) => {

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

const actualizarHospital = async(req, res = response) => {

    const id = req.params.id
    const idUser = req.id

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            }) 
        }

        //hospital.nombre = req.body.nombre;
        const cambiosHospital ={
            ...req.body,
            usuario: idUser
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital, {new: true} );
        
        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
    }

}

const borrarHospital = async(req, res) => {

    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id); 

        if (!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            }) 
        }

        await Hospital.findByIdAndDelete(id);

        res.status(500).json({
            ok: false,
            msg: 'Hospital eliminado'
        }) 
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,
}