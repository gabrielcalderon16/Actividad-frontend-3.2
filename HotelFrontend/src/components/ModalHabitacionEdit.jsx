import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {  useEffect, useMemo, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HotelApi } from '../api/api'
import { useForm } from '../hooks/useForm'
import { Grid } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';

const MySwal = withReactContent(Swal)

const formData = {
  name:'',
  slug:'',
  type:'',
  price:'',
  capacity:'',
  descripcion:'',
}

const FormValidations = {
    name: [( value ) => value.length > 0, 'El name es obligatorio'],
    descripcion: [( value ) => value.length > 0, 'El descripcion es obligatorio'],
  };
 
export const ModalHabitacionEdit = ({openModal, handleClose, habitacion , gethabitacion}) => {

  const { name, slug, type, price, capacity, descripcion, 
    nameValid, slugValid, typeValid, priceValid, capacityValid, descripcionValid,
     onInputChange, formState:FormEdithabitacion,
    formStateValid:FormEdithabitacionValid, onResetForm } = useForm (habitacion ? habitacion : formData, FormValidations)
    const [FormSubmitted, setFormSubmitted] = useState(false)
    const [value, setValue] = useState("Descripcion")

    useEffect(() => {
      setValue(habitacion?.descripcion)
    }, [habitacion])
    
    const funcion = (e) => {
        onInputChange({target:{name:"descripcion", value:e}})
    };

    const onSubmit= async (event) => {
        event.preventDefault(); 
        setFormSubmitted(true)
  
        if(!FormEdithabitacionValid) return
        console.log(FormEdithabitacion)
        if(habitacion){
          const resp = await HotelApi.put(`/habitacion/${habitacion.uid}`, FormEdithabitacion)
          .then(resp => {
              close()
              gethabitacion()
              MySwal.fire({
                  title: 'Editar habitacion',
                  text: 'Edicion realizada correctamente',
                  icon: 'success',
                  confirmButtonText: 'Ok',
                })
          })
          .catch(
              error => {
            setFormSubmitted(false)
                  MySwal.fire({
                      icon: 'error',
                      title: 'Ups...',
                      text: error.response.data.msg,
                      confirmButtonText: 'Ok',
                    })
              }
          )
        } else {
          const resp = await HotelApi.post(`/habitacion`, FormEdithabitacion)
          .then(resp => {
              close()
              gethabitacion()
              MySwal.fire({
                  title: 'Crear habitacion',
                  text: 'Creacion de nuevo habitacion realizada correctamente',
                  icon: 'success',
                  confirmButtonText: 'Ok',
                })
          })
          .catch(
              error => {
            setFormSubmitted(false)
                  MySwal.fire({
                      icon: 'error',
                      title: 'Ups...',
                      text: error.response.data.msg,
                      confirmButtonText: 'Ok',
                    })
              }
          )
        }
       
    }

    const onCLose = ()=> {
        return true
      }

      const close = () => {
        handleClose()
        onResetForm()
        setFormSubmitted(false)
      }

  return (
    <>
     <Dialog open={openModal} onClose={onCLose}>
         <DialogTitle>
          {
           habitacion ? "Editar habitacion" : "Crear habitacion"
          }
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
            {
           habitacion ? "Edita la información del habitacion seleccionado" : "Crear un habitacion nuevo"
           }
            </DialogContentText>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
            <Grid container>
                <Grid item xs={12}  sx={{mt:2}}>
                <TextField label="Nombre" type="text" placeholder="name" value={name} name="name" error={!!nameValid && FormSubmitted } helperText={ !!nameValid && FormSubmitted  ? nameValid : ''} onChange={onInputChange} fullWidth/>
            </Grid>
                <Grid item xs={12}  sx={{mt:2}}>
                <TextField label="slug" type="text" placeholder="slug" value={slug} name="slug" error={!!slugValid && FormSubmitted } helperText={ !!slugValid && FormSubmitted  ? slugValid : ''} onChange={onInputChange} fullWidth/>
            </Grid>
            <Grid item xs={12}  sx={{mt:2}}>
               <TextField label="tipo" type="text" placeholder="type" value={type} name="type" error={!!typeValid && FormSubmitted } helperText={ !!typeValid && FormSubmitted  ? typeValid : ''} onChange={onInputChange} fullWidth/>
            </Grid>
            <Grid item xs={12}  sx={{mt:2}}>
               <TextField label="capacidad" type="text" placeholder="capacidad" value={capacity} name="capacity"  error={!!capacityValid && FormSubmitted } helperText={ !!capacityValid && FormSubmitted  ? capacityValid : ''} onChange={onInputChange} fullWidth/>
            </Grid>
            <Grid item xs={12}  sx={{mt:2}}>
               <TextField label="precio" type="text" placeholder="precio" value={price} name="price"  error={!!priceValid && FormSubmitted } helperText={ !!priceValid && FormSubmitted  ? priceValid : ''} onChange={onInputChange} fullWidth/>
            </Grid>
          <Grid item xs={12}  sx={{mt:2}}>
    <Editor
      apiKey='znyzivm155uvsgettibd1xlj8mrjeep81x92258trcw1tmwb'
      name="descripcion"
      initialValue={value} 
      onEditorChange={(e)=> funcion(e)}
      init={{
        plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        language: 'es',
        autocorrect: false,
        text_direction: 'ltr',
        directionality: 'ltr', // Establecer dirección de izquierda a derecha
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("Consulte la documentación para implementar un asistente de IA")),
      }}
    />
                {
                  !!descripcionValid && FormSubmitted  ?
                  <span> {descripcionValid} </span> 
                  : 
                  <></>
                }
                </Grid>
            </Grid>
            </form>
         </DialogContent>

            <DialogActions>
          <Button onClick={close}>Cancelar</Button>
          <Button onClick={onSubmit} >Guardar</Button>
        </DialogActions>
        </Dialog>
    </>
  )
}
