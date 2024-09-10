const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config')
const cors = require('cors')

// Crear el servidor de express
const app = express();

//Configurar CORS
app.use( cors() );

//Base de datos
dbConnection(); 

// Rutas
app.get( '/', (req, res) => {

    res.status(400).json({
        ok: true,
        msg: 'Hola Mundo'
    })

});

app.listen(process.env.PORT , () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})