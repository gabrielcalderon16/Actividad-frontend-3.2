const {Schema, model} = require('mongoose')

const HabitacionSchema = Schema({

    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    images:{
        type:String,
    },
    capacity:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
})

HabitacionSchema.method('toJSON', function(){
  const {__v, _id, ...object} = this.toObject()
    object.uid = _id
  return object
})

module.exports = model('Habitacion', HabitacionSchema)