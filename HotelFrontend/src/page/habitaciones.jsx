import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { IconButton } from "@mui/material";
import { EditOutlined, DeleteOutlined, AddOutlined, UploadOutlined } from "@mui/icons-material";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useEffect, useRef, useState } from "react";
import { HotelApi } from "../api/api";
import Header from "../components/Header";
import { ModalHabitacionEdit } from "../components/ModalHabitacionEdit";

const MySwal = withReactContent(Swal)


export const Habitacion = () => {

    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [habitacion, sethabitacion] = useState(false);
    const fileInputRef= useRef()
  
    useEffect(() => {
          gethabitacion()
        }, []);
  
  
        const gethabitacion = async () => {
          const resp = await HotelApi.get('/habitacion')
          .then( resp => {
          setData(resp.data.habitacion);
          })
          .catch(
              error => {
                  MySwal.fire({
                      icon: 'error',
                      title: 'Ups...',
                      text: error.response.data.msg,
                      confirmButtonText: 'Ok',
                    })
              }
          )
         }

         const onFileInputChange = async ({target}, item) => {
            console.log("subiendo")
          const selectedFile = target.files[0];
          if (!selectedFile) return

          const formData = new FormData();
          formData.append('image', selectedFile);
          const resp = await HotelApi.post(`/upload/${item.uid}`, formData)
          .then(resp => {
              MySwal.fire("Imagen!", "Imagen guardada correctamente", "success");
          })
        }
  
        const handleEdit = (item) => {
          sethabitacion(item)
          setOpenModal(true);
        };

        const handleClickOpen = () => {
          sethabitacion(false);
          setOpenModal(true);
        };
  
        const handleClose = () => {
          setOpenModal(false);
        };
      
      
        const handleDelete = (uid) => {
          MySwal.fire({
              title: "Quieres eliminar este habitacion?",
              showCancelButton: true,
              cancelButtonText:'Cancelar',
              confirmButtonText: "Eliminar",
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                  deleteFun(uid)
              } 
            });
        };
  
        const deleteFun = async(uid) => {
          const resp = await HotelApi.delete(`/habitacion/${uid}`)
         .then(resp => {
             MySwal.fire("Eliminado!", "Habitacion eliminado correctamente", "success");
         })
         gethabitacion()
         .catch(error => {
          MySwal.fire({
              icon: 'error',
              title: 'Ups...',
              text: error.response.data.msg,
              confirmButtonText: 'Ok',
            })
         })
        }

    return (
        <>
            <Header />
            <div >
            <Table>
            <TableBody>
                    <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Slug</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Capacity</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Acciones</TableCell>

                    </TableRow>
                {data.map((item) => (
                <TableRow key={item.uid}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.slug}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.capacity}</TableCell>
                    <TableCell dangerouslySetInnerHTML={{ __html: item.descripcion }}></TableCell>
                    <TableCell>
                    <input type="file" ref={fileInputRef}  onChange={($event) => onFileInputChange($event, item)} style={{display:'none'}}/>
                    <IconButton  onClick={ () => fileInputRef.current.click() }>
                        <UploadOutlined />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(item)}>
                        <EditOutlined />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.uid)}>
                        <DeleteOutlined />
                    </IconButton>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
            </div>  

            <IconButton
              size='large'
              sx={{color: 'white',
              backgroundColor:'black',
              ':hover': {backgroundColor:'black', opacity:0.7}, 
              position:'fixed', 
              left:50, 
              bottom:50 }}
              onClick={handleClickOpen}
              >
                <AddOutlined
                color="primary"
                sx={{fontSize: 30}}
                />
              </IconButton>
            <ModalHabitacionEdit openModal={openModal} handleClose={handleClose} habitacion={habitacion} gethabitacion={gethabitacion}/>
        </>
     )
}
