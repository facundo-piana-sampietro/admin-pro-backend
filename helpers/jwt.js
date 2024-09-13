const jwt = require('jsonwebtoken')

const generarJWT = ( id ) => {

    return new Promise( (resolve, reject)  => {
        
        const payload = {
            id // esto es lo mismo que id: id pero, como la propiedad es igual a la variable, se pone asi
        }

        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT')
            }else {
                resolve ( token );
            }
        })
    });

}


module.exports = {
    generarJWT,
}