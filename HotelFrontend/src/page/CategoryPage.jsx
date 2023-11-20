import React, { useContext } from 'react'
import { HotelRoomDetail } from '../Detail/HotelDetail'
import { Card } from '../components/Slider'
import WrapperContainer from '../components/WrapperContainer'
import SearchRooms from '../components/SearchRooms'
import { Link } from 'react-router-dom'
import Contex from '../contextApi/Contex'
import { v4 } from 'uuid';


const CategoryPage = () => {

  const {Room, Guest, PriceRange} = useContext(Contex)

  let detail = HotelRoomDetail
  if (Room !== '' && Room !== 'All') {
    detail = HotelRoomDetail.filter(item => item.type === Room);
  }
  if (Guest !== '') {
    detail = detail.filter(item => item.capacity === Guest);
  }
  if (PriceRange !== '') {
    detail = detail.filter(item => item.price === PriceRange);
  }

  return (
    <div className="bg-[#d27548]">
      <WrapperContainer>
      <SearchRooms />
      <div id="showcase-Section" className="flex flex-wrap flex-col md:flex-row justify-between items-center pt-8">
            {detail.map(detail => (
        <Link key={v4()} to={`/SingleHotelView/${detail.id}`}><Card key={v4()} detail={detail} /></Link>
      ))}
      </div>
      </WrapperContainer>
    </div>
  )
}

export default CategoryPage;
