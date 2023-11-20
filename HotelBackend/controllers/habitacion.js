const {response} = require('express')
const Habitacion = require('../models/Habitacion');

const GetHabitacion = async(req, resp)=>{
    try{
      const habitacion = await Habitacion.find();

      resp.json({
          ok: true,
          habitacion,
      })
    }catch (error) {
      console.log(error)
      resp.status(500).json({
          ok:false,
          msg:"Hable con el administrador"
      })
  }
}


const AddHabitacion = async (req, resp = response) =>{

    try {

      const habitacion = new Habitacion(req.body)
      await habitacion.save()

      resp.json({
        ok: true,
        msg:"Habitacion Guardado correctamente"
    })

    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
}

const PutHabitacion = async (req, resp = response) =>{
  const uid = req.params.id
  try {

    const HabitacionDb = await Habitacion.findById(uid);

    if(!HabitacionDb){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe un Habitacion por ese id'
        })
    }

       //Actualizaciones
       const HabitacionActualizado = await Habitacion.findByIdAndUpdate(uid, req.body, {new: true})

    resp.json({
      ok: true,
      msg:"Habitacion Actualizado correctamente",
      HabitacionActualizado
  })

  } catch (error) {
      console.log(error)
      resp.status(500).json({
          ok:false,
          msg:"Hable con el administrador"
      })
  }
}

const eliminarHabitacions = async(req, resp = response)=> {
  const uid = req.params.id

  try {

    const HabitacionDb = await Habitacion.findById(uid)
 
    if(!HabitacionDb){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe un Habitacion por ese id'
        })
    }

      await Habitacion.findByIdAndDelete(uid)

      resp.json({
          ok:true,
          msg: 'Habitacion eliminado'
          })  

      
  } catch (error) {
      resp.json({
          ok:true,
          msg: 'Hable con el administrador'
          })      
  }
}


module.exports = {AddHabitacion, GetHabitacion, PutHabitacion, eliminarHabitacions}