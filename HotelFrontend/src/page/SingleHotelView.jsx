import React, { useEffect, useState } from "react";
import WrapperContainer from "../components/WrapperContainer";
import { useParams, useNavigate  } from "react-router-dom";
import { HotelRoomDetail } from "../Detail/HotelDetail";
import './SingleHotelViex.css'

const SingleHotelView = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [hotelDetail, setHotelDetail] = useState([])
  


  useEffect(() => {
    const arrayDetail = [...HotelRoomDetail]
    const hotelDetailFilter = arrayDetail.filter(detail => detail.id === +id )
    setHotelDetail(hotelDetailFilter)
  }, [id])
  
  if (hotelDetail.length === 0) {
    return null; // or a loading indicator
  }

  const { images, capacity, name, description, type, price } = hotelDetail[0];

  const reservar =()=> {
    navigate("/Reservar")
  }

  return (
    <div
      className="bg-cover bg-center h-screen relative"
      style={{ backgroundImage: `url(${images})` }}
    >
      <WrapperContainer>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className=" absolute">
          <div className="relative container text-[#fcf2de] capitalize animate__animated animate__fadeInTopLeft">
             <p className="text-center p-4 py-8 text-6xl title">El mejor hotel con las mejores habitaciones que podras conseguir en tu aventura en Amazonas!</p>
             <div className="flex justify-between items-center py-8">
                 <img className="w-1/2 p-4 rounded img title" src={images} alt="" />
                 <div className="p-4">
                    <span>Habitaciones : {capacity}</span>
                    <h2 className="text-7xl font-bold">{name}</h2>
                    <span>{description}</span>
                    <p>{type}</p>
                    <p className="text-white text-4xl py-4">${price}</p>
                    <button onClick={reservar} className="px-6 p-2 bg-[#fcf2de] uppercase text-[#d27548] font-normal rounded hover:bg-orange-300 ease-linear hover:text-[#000000cd]">
                      Reserva ahora
                    </button>
                 </div>
             </div>
          </div>
        </div>
      </WrapperContainer>
    </div>
  );
};

export default SingleHotelView;
