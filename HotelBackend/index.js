const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {dbConecction} = require('./database/config');

//Crear servidor de express
const app = express();

//Configurar CORS
app.use(cors())

//lectura y parseo del body
app.use(express.json())

//Base de datos 
dbConecction()



//Rutas
app.use('/api/login', require('./routes/auth'))
app.use('/api/usuarios', require('./routes/usuario'))
app.use('/api/reservar', require('./routes/reservar'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/habitacion', require('./routes/habitacion.js'))
app.use('/api/upload', require('./routes/upload.js'))



app.listen( process.env.PORT, ()=> {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
} );