
import { useEffect, useState } from 'react'
import { HotelApi } from '../api/api'
import './showcase.css'
import base64 from 'base64-js';


const Showcase2 = ({img, title, desc, slug, capacity, type, id}) => {


  return (
    <div className='text-[#fcf2de] flex flex-col items-center p-2 gap-2 md:w-1/3 pb-6 animate__animated animate__pulse animate__infinite'>
        <img className='rounded p-8 img' src={img}  alt="" />
        <h3 className="text-xl">Nombre: {title}</h3>
        <span className='text-[12px] text-center p-1'>SLug: {slug}</span>
        <span className='text-[12px] text-center p-1'>Capacidad: {capacity}</span>
        <span className='text-[12px] text-center p-1'>Tipo: {type}</span>
    </div>
  )
}

export default Showcase2