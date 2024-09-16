const { response } = require('express')
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {
    const medicos = await Medico.find()
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img')

    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async(req, res = response) => {
    const idUser = req.id
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

    const id = req.params.id
    const userId = req.id

    try {
        
        const medico = await Medico.findById(id);

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

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

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

    const id = req.params.id

    try {
        
        const medico = await Medico.findById(id);
        if (!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado.'
            })
        }

        await Medico.findByIdAndDelete(id);

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
    crearMedico,
    actualizarMedico,
    borrarMedico
}