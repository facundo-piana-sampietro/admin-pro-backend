const mongoose = require('mongoose');


const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB Online')
    } catch (error){
        throw new Error('Error a la hora de inicar la BD, ver logs')
    }

}

//Exporto esta funcion
module.exports = {
    dbConnection
}