import React from "react";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";
// import DashboardView from "./DashboardView";
import AdminDashboard from "./DashboardView";
import '../Dashboard/dashboardstyles/dashboardlayout.css'

import { Outlet } from "react-router-dom";



function DashboardLayout(){
    return(
        <div>
           
            <Sidebar/>
            <DashboardNavbar/>
            <Outlet/>
        
        </div>
    )
}

export default DashboardLayout;