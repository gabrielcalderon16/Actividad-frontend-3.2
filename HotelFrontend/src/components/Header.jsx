import React, { useEffect, useState } from "react";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import CloudIcon from '@mui/icons-material/Cloud';
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [mode, setmode] = useState(false);
  const [weather, setWeather] = useState(null);

  const toggleTheme = () => {
    setmode(!mode)
    const body = document.querySelector("body")
    const theme = body.classList.contains("darkMode")  ? "lighMode" : "darkMode"
    console.log(theme)
    body.classList.toggle(theme)
    return theme
  }

  const newPath = useLocation().pathname;
  const navigate = useNavigate();


  const [AdminSession, setAdminSession] = useState(false)
  const [UserSession, setUserSession] = useState(false)


  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('Usuario')) 

    if(user){
      setUserSession(true)
    }else {
      setUserSession(false)
    }

    if(newPath === '/administracion' || newPath === '/habitaciones')  {
      setAdminSession(true)
    }else {
      setAdminSession(false)
    }
  }, [newPath])
  

  useEffect(() => {
    // Realiza la solicitud a la API.
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          appid: "526e623d5410aeb1422b110c381b09a0",
          units: "metric",
          q: "Amazonas,Venezuela"
        }
      })
      .then(response => {
        // Verifica si la solicitud fue exitosa.
        if (response.status === 200) {
          // Decodifica la respuesta JSON.
          const data = response.data;

          // Obtiene la información del clima.
          const weather = data["weather"][0];
          const temperature = data["main"]["temp"];

          // Actualiza el estado de la aplicación.
          setWeather({
            weather: weather["description"],
            temperature: temperature
          });
        }
      })
      .catch(error => {
        // Handle error.
      });
  }, []);

  const logout = () => {
    setIsMenu(false)
    localStorage.removeItem('Token')
    localStorage.removeItem('Usuario')
    navigate("/")
    window.location.reload();
  }

  const login = () => {
    navigate("/login")
  }


  return (
    <>
      <div className="flex justify-between items-center p-4 pt-8 container m-auto">
        {
          AdminSession ?
           <>
            <div className={`hidden md:block ${isMenu ? "block" : "hidden"}`}>
              <ul className="list-none capitalize flex">
                <Link to={"/administracion"}><li className="px-4 relative cursor-pointer">Posts</li></Link>
                <Link to={"/habitaciones"}><li className="px-4 relative cursor-pointer">Habitaciones</li></Link>
              </ul>
            </div> 
           </>
            :
            <div className={`hidden md:block ${isMenu ? "block" : "hidden"}`}>
              <ul className="list-none capitalize flex">
                <Link to={"/"}><li className="px-4 relative cursor-pointer">Dashboard</li></Link>
                <Link to={"/Category"}><li className="px-4 relative cursor-pointer">Categorias</li></Link>
                <Link to={"/Blogs"}><li className="px-4 relative cursor-pointer">Blogs</li></Link>
                {
                   UserSession || AdminSession ? <Link to={"/Reservar"}><li className="px-4 relative cursor-pointer">Reservar</li></Link> : <></>
                }
              </ul>
            </div> 
        }
        
        <div className="w-20 md:w-30">

        {
          AdminSession ?
          <img src={logo} alt="logo" />
          :  
          <Link to={'/'}>
           <img src={logo} alt="logo" />
          </Link>
        }
          
        </div>

            <div>
             
          <button onClick={() =>toggleTheme()}>
            {
                mode ? <WbSunnyOutlinedIcon/> : <DarkModeOutlinedIcon/>
            }
          </button>
        </div>
        <div >
          <span>
            Temperatura 
          <span className="p-1"> {weather?.temperature} °C</span>
          <CloudIcon/>
          </span>
        </div>
        <div className="block md:hidden px-8 p-4" onClick={() => setIsMenu(!isMenu)}>
          <DensityMediumIcon />
        </div>

        {
          UserSession ?
            <div className={`hidden md:block ${isMenu ? "block" : "hidden"}`}>
              <ul className="list-none capitalize flex">
                <li className="px-4 relative cursor-pointer" onClick={logout}>Cerrar sesion</li>
              </ul>
            </div> 
            :
            <div className={`hidden md:block ${isMenu ? "block" : "hidden"}`}>
            <ul className="list-none capitalize flex">
              <li className="px-4 relative cursor-pointer" onClick={login}>Iniciar sesion</li>
            </ul>
          </div> 
        }

      </div>
      <div className="reletive">
      {
          AdminSession ?
          <div className={`${isMenu ? "block" : "hidden"} bg-[#d27548] text-white md:hidden absolute rounded left-0 right-0`}>
          <ul className="list-none capitalize flex flex-col">
          <Link to={"/administracion"}><li className="px-4 relative cursor-pointer">Posts</li></Link>
          <Link to={"/habitaciones"}><li className="px-4 relative cursor-pointer">Habitaciones</li></Link>
          <li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={logout}>Cerrar sesion</li>
          </ul>
        </div>
          :  
          <div className={`${isMenu ? "block" : "hidden"} bg-[#d27548] text-white md:hidden absolute rounded left-0 right-0`}>
          <ul className="list-none capitalize flex flex-col">
          <Link to={"/"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Dashboard</li></Link>
          <Link to={"/Category"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Categorias</li></Link>
          <Link to={"/Blogs"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Blogs</li></Link>
          <Link to={"/Reservar"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Reservar</li></Link>
          </ul>
        </div>
        }
      </div>
    </>
  );
}

export default Header;
