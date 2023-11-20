import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { HotelRoomDetail } from '../Detail/HotelDetail';
import './slider.css'

const SliderCarousel = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={3}
      modules={[Navigation, Pagination, Autoplay]}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      autoplay={{"delay": 3000,}}
      className="swiper"
    >
      {HotelRoomDetail.map(img =><SwiperSlide  key={img.id} style={{height:'300px'}}><img src={img.images} alt=""/></SwiperSlide>)}
    </Swiper>
  );
};

export default SliderCarousel;