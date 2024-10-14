const { response } = require('express')
const Hospital = require('../models/hospital');

const getHospitalesPaginado = async(req, res = response) => {

    const desde = Number(req.query.desde)

    const [hospitales, total] = await Promise.all([
        
        Hospital.find()
            .populate('usuario', 'nombre img')
            .skip(desde)
            .limit( 5 ),
            
        Hospital.countDocuments()
    ])
                    

    res.json({
        ok: true,
        hospitales,
        total
    })
}

const getHospitales = async(req, res = response) => {
    const hospitales = await  Hospital.find()
                        .populate('usuario', 'nombre img')
                        
    res.json({
        ok: true,
        hospitales
    })
}


const crearHospital = async(req, res = response) => {

    const _id = req._id;
    const hospital = new Hospital ({
        usuario: _id,
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

    const _id = req.params.id
    const idUser = req._id

    try {
        const hospital = await Hospital.findById(_id);

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

        const hospitalActualizado = await Hospital.findByIdAndUpdate(_id,cambiosHospital, {new: true} );
        
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

    const _id = req.params.id;

    try {
        const hospital = await Hospital.findById(_id); 

        if (!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            }) 
        }

        await Hospital.findByIdAndDelete(_id);

        res.json({
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
    getHospitalesPaginado,
    crearHospital,
    actualizarHospital,
    borrarHospital,
}