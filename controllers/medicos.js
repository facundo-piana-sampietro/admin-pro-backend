const { response } = require('express')
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0

    const [medicos, total] = await  Promise.all([
            Medico.find()
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img')
                    .skip( desde )
                    .limit(5),
            Medico.countDocuments()
        ]) 

    res.json({
        ok: true,
        medicos,
        total
    })
}

const getMedicoById = async(req, res = response) => {

    const _id = req.params.id
    
    try {
        const medico = await Medico.findById(_id)
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img')
    
        if (!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado.'
            }) 
        }
       
        res.json({
            ok: true,
            medico
        })   
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}

const crearMedico = async(req, res = response) => {
    const idUser = req._id
    const medico = new Medico({
        usuario: idUser,
        ...req.body
    })

    try {        
        const medicoDB = await medico.save();

        return res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarMedico = async(req, res = response) => {

    const _id = req.params.id
    const userId = req._id

    try {
        
        const medico = await Medico.findById(_id);

        if (!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado.'
            })
        }

        cambiosMedico = {
            ...req.body,
            usuario: userId
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(_id, cambiosMedico, {new: true});

        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarMedico = async(req, res = response) => {

    const _id = req.params.id

    try {
        
        const medico = await Medico.findById(_id);
        if (!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado.'
            })
        }

        await Medico.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Médico eliminado'
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getMedicos,
    getMedicoById,
    crearMedico,
    actualizarMedico,
    borrarMedico,
}