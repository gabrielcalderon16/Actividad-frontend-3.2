import { HotelRoomDetail } from "../Detail/HotelDetail"
import { useForm } from "../hooks/useForm"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Navigate } from "react-router-dom"
import { useState } from "react"
import { HotelApi } from "../api/api"

const MySwal = withReactContent(Swal)


let formData = {
  nombre:'',
  email:'',
  paquete:'Resort y spa de lujo',
}

const FormValidations = {
  nombre: [( value ) => value.length > 0, 'El nombre es obligatorio'],
  email: [( value ) => value.includes('@'), 'el email es obligatorio']
}


export const Reservaciones = () => {

  const { nombre, email, paquete ,nombreValid, 
     emailValid,  onInputChange, formState:formReservar,
    formStateValid:FormReservarValid, onResetForm } = useForm(formData, FormValidations)

    const [FormSubmitted, setFormSubmitted] = useState (false)


    const onSubmit = async (e) => {
      e.preventDefault()
      setFormSubmitted(true)
     if(!FormReservarValid) return
     const resp = await HotelApi.post(`/reservar`, formReservar)
     .then( resp => {
      setFormSubmitted(false)
      MySwal.fire({
        title: 'Guardado correctamente',
        text: resp.data.msg,
        icon: 'success',
        confirmButtonText: 'Ok',
      })
      onResetForm()
    })

    }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Reserva tu paquete</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" >
      <div>
          <label  className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
          <div className="mt-2">
            <input  
            name="nombre" 
            type="text" 
            value={nombre}   
            onChange={onInputChange}  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          {
            !!nombreValid && FormSubmitted ? <span style={{color: 'red'}}> { nombreValid }</span> : <></>
          }
        </div>

        <div>
          <label  className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div className="mt-2">
            <input 
            name="email" 
            type="email"
            value={email}   
            onChange={onInputChange} 
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          {
            !!emailValid && FormSubmitted ? <span style={{color: 'red'}}> { emailValid }</span> : <></>
          }
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label  className="block text-sm font-medium leading-6 text-gray-900">Paquete a Reservar</label>
            <div className="text-sm">
            </div>
          </div>
          <div className="mt-2">
          <select
          name="paquete" 
          type="paquete"
          value={paquete}   
          onChange={onInputChange} 
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          {
            HotelRoomDetail.map(habitacion =>  <option key={habitacion.id} value={habitacion.name}>{habitacion.name}</option>)
          }
        </select>
          </div>
        </div>
  
        <div>
          <button onClick={onSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Enviar</button>
        </div>
      </form>
    </div>
    </div>
  )
}
