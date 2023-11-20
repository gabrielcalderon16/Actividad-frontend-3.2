import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HotelApi } from "../api/api";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const MySwal = withReactContent(Swal)


const formLogin = {
  email:'',
  password:''
}

export const Login = ({loginFun}) => {

  const navigate = useNavigate();


  const { email, password, onInputChange, formState:Formlogin } = useForm (formLogin)


  const submit = async(e)=> {
    e.preventDefault();
    const resp = await HotelApi.post(`/login`, Formlogin)
    .then(resp =>{
      localStorage.setItem('Token', resp.data.token)
      localStorage.setItem('Usuario', JSON.stringify(resp.data.usuario))
      MySwal.fire({
        title: 'Login',
        text: 'Inicio de sesion correcto',
        icon: 'success',
        confirmButtonText: 'Ok',
      })
      loginFun()
      if(resp.data.usuario.role === "ADMIN"){
        navigate("/administracion")
      }else {
        navigate("/")
      }
    } )
    .catch(error => 
      MySwal.fire({
        icon: 'error',
        title: 'Ups...',
        text: error.response.data.msg,
        confirmButtonText: 'Ok',
      })
      );

  }

  return (
        <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicia sesión</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" method="POST">
      <div>
        <label  className="block text-sm font-medium leading-6 text-gray-900">Email</label>
        <div className="mt-2">
          <input  name="email" type="email" required  value={email} onChange={onInputChange}  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label  className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
          <div className="text-sm">
          </div>
        </div>
        <div className="mt-2">
          <input  name="password" type="password" value={password} onChange={onInputChange}  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
          <Grid container direction="row" justifyContent='end'>
                        <Link component={ Link } color='inherit' to="/register">
                          Crear una cuenta
                        </Link>
          </Grid>
      <div>
        <button onClick={submit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Iniciar sesión</button>
      </div>
    </form>
  </div>
        </div>
</>
  )
}
