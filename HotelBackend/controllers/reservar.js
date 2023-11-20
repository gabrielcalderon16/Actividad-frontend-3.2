const {response} = require('express')
const nodemailer = require('nodemailer');

const reservar = async (req, resp = response) =>{

    const {nombre, email, paquete} = req.body;

    try {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'calderonmendezg@uvm.edu.ve',
              pass: 'UVM30976470'
            }
          });
        
        const mailOptions = {
            from: 'calderonmendezg@uvm.edu.ve',
            to: email,
            subject: 'Reservación en Hotel yoyo',
            text: `sr. ${nombre}, para que su reservacion del paquete ${paquete} se realice correctamente, debe realizar su respectivo pago a la siguiente cuenta paypal calderonmendezg@uvm.edu.ve. Esperamos verlo en nuestras instalaciones pronto!`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              resp.json({
                ok:false,
                msg:"Hubo un error al enviar el correo."
            })
            } else {
              resp.json({
                ok:true,
                msg:"Reserva realizada correctamente, revisa el correo inscrito para recibir informacion sobre su reserva."
            })
            }
          });

    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
}


module.exports = {reservar}