const {response} = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const {generarJWT} = require('../helpers/jwt')


const login = async (req, resp = response) =>{

    const {email, password} = req.body;

    try {

        const usuario = await Usuario.findOne({email})

        //Verificar Email

        if(!usuario){
            return resp.status(404).json({
                ok:false,
                msg: "El email no existe"
            })
        }

        //Verificar contraseña

        const validPassword = await bcrypt.compareSync(password, usuario.password)

        if(!validPassword) {
          
                return resp.status(400).json({
                    ok:false,
                    msg: "Contraseña incorrecta"
                })
        }
      
        //Generar el token - JWT

        const token = await generarJWT(usuario._id)

        resp.json({
            ok:true,
            token,
            usuario
        })

    
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
}


module.exports = {login}