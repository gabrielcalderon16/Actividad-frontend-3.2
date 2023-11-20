const mongoose = require('mongoose');

const dbConecction = async ()=>{

    try {
        await mongoose.connect(process.env.DB_CNN)
        console.log('Ya esta conectado a la base de datos')
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la BD ver logs')
    }
  
}

module.exports= {
    dbConecction
}