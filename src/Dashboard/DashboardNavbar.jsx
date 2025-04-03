import React from "react";
import { FaEnvelope, FaBell, FaSearch,FaTh, FaCog } from "react-icons/fa";
import "../Dashboard/dashboardstyles/dashboardnavbar.css";

function DashboardNavbar () {
    return (
        <div className="navbar">
            <div className="navbar-logo">WeHereForYo^
               <FaTh size={20} />
            </div>
            <div className="header-actions">
                <div className="search-bar">
                    <input type="text" placeholder="Search for..."  />
                    <span> <FaSearch/> </span>
                </div>
            </div>
            <div className="icon-content">
                <div className="icon">
                    <FaEnvelope size={20} />
                    <span>8</span>
                </div>
                <div className="icon">
                    <FaBell size={20} />
                    <span>13</span>
                </div>
                <FaCog size={20} />
                <div className="flex items-center gap-2">
                    <img src="https://via.placeholder.com/30" alt="Profile" />
                    <span>Kunda</span>
                </div>
                
            </div>
        </div>
    )
}
export default DashboardNavbar;
