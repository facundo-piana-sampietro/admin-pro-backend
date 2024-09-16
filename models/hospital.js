const { Schema, model } = require('mongoose')// --> Forma para importar directamente lo que queremos utilizar del paquete de mongoose
//const mongoose  = require('mongoose')// --> Forma para usar todo lo que esté dentro del paquete de mongoose. Ejemplo mongoose.model, mongoose.Schema 


const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' });

HospitalSchema.method('toJSON', function(){
    const {__v, _id, ...object}  = this.toObject();

    object.id = _id

    return object;
})

module.exports = model( 'Hospital', HospitalSchema ); //Por defecto, si no agregamos el plural,  Mongoose se lo pone automaticamente