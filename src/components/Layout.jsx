import React from "react";
import {Outlet} from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
function Layout()
{
    return (
    <div>
       <NavBar/>
       <Outlet/>
       <Footer/>
    </div>
    
    )
}

export default Layout
