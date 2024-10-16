const { Schema, model } = require('mongoose')// --> Forma para importar directamente lo que queremos utilizar del paquete de mongoose
//const mongoose  = require('mongoose')// --> Forma para usar todo lo que esté dentro del paquete de mongoose. Ejemplo mongoose.model, mongoose.Schema 


const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});

MedicoSchema.method('toJSON', function(){
    const {__v, ...object}  = this.toObject();

    return object;
})

module.exports = model( 'Medico', MedicoSchema ); //Por defecto, si no agregamos el plural,  Mongoose se lo pone automaticamente