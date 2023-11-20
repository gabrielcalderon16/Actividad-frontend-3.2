const Habitacion = require('../models/Habitacion');
const fs = require('fs');
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'dz6vneyx4',
  api_key: '735479772941418',
  api_secret: 'P1CCKal5Il1kNiHzY8bHxoa0TUc'
})

 const postImage = async(req, res, next) => {
    // Obtener el nombre del archivo subido
    const idHab = req.params.idHab;
    const file = req.file.path
    try {
      
      // Guardar el archivo subido
      cloudinary.v2.uploader.upload(file, async (err, result) => {
          if (err) {
            res.status(500).send(err)
          } else {
            const habitacion = await Habitacion.findById(idHab)
            habitacion.images = result.url

            await habitacion.save()
            res.status(200).send({
              ok:true,
              message: `Imagen subida correctamente`,
              result:result.url
              });
          }
        }
          )
      
    } catch (error) {
      console.log(error)
        res.status(500).send({
            ok:true,
            message: `Contacta al administrador`,
          });
    }
 
  };

  const getImage =  (req, res, next) => {

    try {
       // Obtener el nombre del archivo
       const fileName = req.params.fileName;
  
       // Obtener el archivo subido
       const file = fs.readFileSync(`./images/${fileName}`);
     
       const base64Data = Buffer.from(file).toString('base64');

       // Devolver la imagen
       res.status(200).send({imagen : base64Data});

} catch (error) {
  console.log(error)
   res.status(500).send({
       ok:true,
       message: `Contacta al administrador`,
     });
}
 
  }


module.exports = {postImage, getImage}
