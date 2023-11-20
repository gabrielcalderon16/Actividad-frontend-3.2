const {Schema, model} = require('mongoose')

const ReservaSchema = Schema({

    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    paquete:{
        type:String,
        required:true
    },
})

ReservaSchema.method('toJSON', function(){
  const {__v, _id, ...object} = this.toObject()
    object.uid = _id
  return object
})

module.exports = model('Reserva', ReservaSchema)