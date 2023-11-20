const {response} = require('express')
const Posts = require('../models/Posts');

const GetPost = async(req, resp)=>{
    try{
      const posts = await Posts.find();

      resp.json({
          ok: true,
          posts,
      })
    }catch (error) {
      console.log(error)
      resp.status(500).json({
          ok:false,
          msg:"Hable con el administrador"
      })
  }
}


const AddPost = async (req, resp = response) =>{

    try {

      const post = new Posts(req.body)
      await post.save()

      resp.json({
        ok: true,
        msg:"Post Guardado correctamente"
    })

    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
}

const PutPost = async (req, resp = response) =>{
  const uid = req.params.id
  try {

    const postDb = await Posts.findById(uid);

    if(!postDb){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe un post por ese id'
        })
    }

       //Actualizaciones
       const postActualizado = await Posts.findByIdAndUpdate(uid, req.body, {new: true})

    resp.json({
      ok: true,
      msg:"Post Actualizado correctamente",
      postActualizado
  })

  } catch (error) {
      console.log(error)
      resp.status(500).json({
          ok:false,
          msg:"Hable con el administrador"
      })
  }
}

const eliminarPosts = async(req, resp = response)=> {
  const uid = req.params.id

  try {

    const postDb = await Posts.findById(uid)
 
    if(!postDb){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe un post por ese id'
        })
    }

      await Posts.findByIdAndDelete(uid)

      resp.json({
          ok:true,
          msg: 'Post eliminado'
          })  

      
  } catch (error) {
      resp.json({
          ok:true,
          msg: 'Hable con el administrador'
          })      
  }
}


module.exports = {AddPost, GetPost, PutPost, eliminarPosts}