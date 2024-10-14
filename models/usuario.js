const { Schema, model } = require('mongoose')// --> Forma para importar directamente lo que queremos utilizar del paquete de mongoose
//const mongoose  = require('mongoose')// --> Forma para usar todo lo que esté dentro del paquete de mongoose. Ejemplo mongoose.model, mongoose.Schema 


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function(){
    const {__v, password, ...object}  = this.toObject();

    return object;
})

module.exports = model( 'Usuario', UsuarioSchema ); //Por defecto, si no agregamos el plural,  Mongoose se lo pone automaticamente