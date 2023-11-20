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
  titulo:'',
  descripcion:'',
  autor:'',

}

const FormValidations = {
    titulo: [( value ) => value.length > 0, 'El titulo es obligatorio'],
    descripcion: [( value ) => value.length > 0, 'El descripcion es obligatorio'],
    autor: [( value ) => value.length > 0, 'El autor es obligatorio']
  };
 
export const ModalEdit = ({openModal, handleClose, posts , getPosts}) => {

  const { titulo, descripcion , autor ,  tituloValid, descripcionValid,
    autorValid, onInputChange, formState:FormEditPosts,
    formStateValid:FormEditPostsValid, onResetForm } = useForm (posts ? posts : formData, FormValidations)
    const [FormSubmitted, setFormSubmitted] = useState(false)
    const [value, setValue] = useState()

    useEffect(() => {
      setValue(posts?.descripcion)
    }, [posts])
    
    const funcion = (e) => {
        onInputChange({target:{name:"descripcion", value:e}})
    };

    const onSubmit= async (event) => {
        event.preventDefault(); 
        setFormSubmitted(true)
  
        if(!FormEditPostsValid) return
        if(posts){
          const resp = await HotelApi.put(`/posts/${posts.uid}`, FormEditPosts)
          .then(resp => {
              close()
              getPosts()
              MySwal.fire({
                  title: 'Editar Posts',
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
          const resp = await HotelApi.post(`/posts`, FormEditPosts)
          .then(resp => {
              close()
              getPosts()
              MySwal.fire({
                  title: 'Crear Posts',
                  text: 'Creacion de nuevo posts realizada correctamente',
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
           posts ? "Editar posts" : "Crear posts"
          }
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
            {
           posts ? "Edita la información del posts seleccionado" : "Crear un posts nuevo"
           }
            </DialogContentText>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
            <Grid container>
                <Grid item xs={12}  sx={{mt:2}}>
                <TextField label="Titulo" type="text" placeholder="titulo" value={titulo} name="titulo" error={!!tituloValid && FormSubmitted } helperText={ !!tituloValid && FormSubmitted  ? tituloValid : ''} onChange={onInputChange} fullWidth/>
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

                <Grid item xs={12}  sx={{mt:2}}>
                <TextField label="Autor" type="text" placeholder="autor" value={autor} name="autor" error={!!autorValid && FormSubmitted } helperText={ !!autorValid && FormSubmitted  ? autorValid : ''} onChange={onInputChange} fullWidth/>
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
