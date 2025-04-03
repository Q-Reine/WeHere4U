import React from "react";
import { FaUser, FaHistory, FaHeart, FaComments, FaChartLine, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../Dashboard/dashboardstyles/sidebar.css'

function Sidebar () {
  return (
    <div className="sidebar">
      <h4>Dashboard</h4>
      <ul>
        <li>
          <Link to="/dashboard"> <FaUser /> Profile </Link>
        </li>
        <li>
          <Link to="/user"> <FaHistory/> Order History</Link>  
        </li>
        <li>
          <Link to="/devices"> <FaHistory/> Assistive Devices</Link>  
        </li>
        <li>
          <Link to="/providers"> <FaHistory/> Service Providers</Link>  
        </li>
        <li>
          <Link to="/savedresources" > <FaHeart/> Saved Resources </Link> 
        </li>
        <li >
          <Link to="/profile/forum" ><FaComments/> Forum Activity</Link>       
        </li>
        <hr />
        <li>
          <Link to="/donations" ><FaChartLine /> Manage Donations </Link>    
        </li>
        <hr />
        <li>
          <Link to="/settings"><FaCog/> Accessibility Settings </Link>    
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
