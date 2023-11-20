
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobleCotext from "./contextApi/GlobleContex";
import { Administracion } from "./page/Administracion";
import { Habitacion } from "./page/habitaciones";
import { Login } from "./page/Login";
import { Register } from "./page/Register";

import { RoutesPublic } from "./routes/routesPublic";

function App() {

  const [LoginAdmin, setLogin] = useState(false)
  const [User, setUser] = useState()

  useEffect(() => {
    const loggedIn = localStorage.getItem("Token")
    setUser(JSON.parse(localStorage.getItem("Usuario")))
    console.log()
    if(loggedIn) {
        setLogin(true)
      } else {
        setLogin(false)
      }
    }, [LoginAdmin])

    const loginFun = () => {
      setLogin(true)
  }
  
  return (
    <>
    <GlobleCotext>
      <BrowserRouter>
        <Routes>
        <Route  path="/*" element={<RoutesPublic />}/>
        <Route path="/login" element={<Login loginFun={loginFun} />}/>
        <Route path="/register" element={<Register loginFun={loginFun} />}/>

          {
            LoginAdmin && User?.role === "ADMIN"? 
            <>
              <Route path="/administracion" element={<Administracion />}/> 
              <Route path="/habitaciones" element={<Habitacion />}/> 
            </>
            :
            <>
            </>
          }
        </Routes>
      </BrowserRouter>
      </GlobleCotext>
    </>
  );
}

export default App;
