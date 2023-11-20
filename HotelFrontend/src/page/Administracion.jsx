import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { IconButton } from "@mui/material";
import { EditOutlined, DeleteOutlined, AddOutlined } from "@mui/icons-material";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useEffect, useState } from "react";
import { HotelApi } from "../api/api";
import { ModalEdit } from "../components/ModalEdit";
import Header from "../components/Header";

const MySwal = withReactContent(Swal)


export const Administracion = () => {

    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [posts, setposts] = useState(false);
  
    useEffect(() => {
          getPosts()
        }, []);
  
  
        const getPosts = async () => {
          const resp = await HotelApi.get('/posts')
          .then( resp => {
          setData(resp.data.posts);
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
  
        const handleEdit = (item) => {
          setposts(item)
          setOpenModal(true);
        };

        const handleClickOpen = () => {
          setposts(false);
          setOpenModal(true);
        };
  
        const handleClose = () => {
          setOpenModal(false);
        };
      
      
        const handleDelete = (uid) => {
          MySwal.fire({
              title: "Quieres eliminar este post?",
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
          const resp = await HotelApi.delete(`/posts/${uid}`)
         .then(resp => {
             MySwal.fire("Eliminado!", "Post eliminado correctamente", "success");
         })
         getPosts()
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
                    <TableCell>Titulo</TableCell>
                    <TableCell>Descripcion</TableCell>
                    <TableCell>Autor</TableCell>
                    </TableRow>
                {data.map((item) => (
                <TableRow key={item.uid}>
                    <TableCell>{item.titulo}</TableCell>
                    <TableCell dangerouslySetInnerHTML={{ __html: item.descripcion }}></TableCell>
                    <TableCell>{item.autor}</TableCell>
                    <TableCell>
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
            <ModalEdit openModal={openModal} handleClose={handleClose} posts={posts} getPosts={getPosts}/>
        </>
     )
}
