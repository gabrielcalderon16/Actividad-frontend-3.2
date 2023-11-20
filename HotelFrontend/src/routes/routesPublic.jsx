import Header from "../components/Header"
import {  Routes, Route } from "react-router-dom";
import { ErrorPage } from "../page/ErrorPage";
import CategoryPage from "../page/CategoryPage";
import Blogs from "../page/Blogs";
import { Reservaciones } from "../page/Reservaciones";
import SingleHotelView from "../page/SingleHotelView";
import Home from "../page/Home";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export const RoutesPublic = () => {

  const [User, setUser] = useState()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("Usuario")))
  }, [])
  

  return (
    <>
            <Header />
            <Routes>
            <Route path="/" element={<Home />}/>
                <Route path="/Category" element={<CategoryPage/>}/>
                <Route path="/Blogs" element={<Blogs/>}/>
                {
                     User ? <Route path="/Reservar" element={<Reservaciones />}/> : <></>
                }
                <Route path={`/SingleHotelView/:id`} element={<SingleHotelView/>} />
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
            <Footer />
      </>
  )
}
