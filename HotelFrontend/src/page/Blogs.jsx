import WrapperContainer from '../components/WrapperContainer'
import './Blogs.css'
import 'animate.css';
import { useEffect, useState } from 'react';
import { HotelApi } from '../api/api';
import { Article } from '../components/Article';
import Showcase2 from '../components/Showcase2';

const Blogs = () => {

  const [Blogs, setBlogs] = useState([])
  const [Habitaciones, setHabitaciones] = useState([])


  useEffect(() => {
    getBlogs()
    getHabitaciones()
  }, [])

  const getBlogs = async () =>{
    const resp = await HotelApi.get(`/posts`)
    .then( resp => {
      setBlogs(resp.data.posts)
     })
  }

  const getHabitaciones = async () =>{
    const resp = await HotelApi.get(`/habitacion`)
    .then( resp => {
      setHabitaciones(resp.data.habitacion)
     })
  }


  return (
  <>

    <div className="bg-[#0B8185]">
      <WrapperContainer>
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-wrap gap">
              {
                Blogs.map(post => (
                    <Article key={post.uid} post={post} />
                )
                )
              }
            </div>
          </div>
        </WrapperContainer>
      </div>

  <div className="bg-[#d27548]">
    <WrapperContainer>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-wrap gap text-center">
             <h3 className="text-4xl">Proximas habitaciones</h3>
             <div
              id="showcase-Section"
              className="container m-auto flex flex-wrap flex-col md:flex-row justify-between items-center"
            >
              {Habitaciones.map((habitacion) => (
                <Showcase2
                  key={habitacion.uid}
                  img={habitacion.images}
                  title={habitacion.name}
                  slug={habitacion.slug}
                  capacity={habitacion.capacity}
                  type={habitacion.type}
                  id={habitacion.uid}
                />
              ))}
            </div>
        </div>
      </div>
    </WrapperContainer>
  </div>
  </>
  )
}

export default Blogs;
