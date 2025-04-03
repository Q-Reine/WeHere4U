import React from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css'


function Navbar () {
    return (
        <div className="header">
            <h1>WeHereForYou</h1>
            <div className="nav">
              <ul>
              <Link to="/">Home</Link>
              <Link to="/Marketplace">Marketplace</Link>
              <Link to="/Resources">Resources</Link>
              <Link to="/Community">Community Forum</Link>
              <Link to="/GetInvolved">Get Involved</Link>
              <Link to="/login"> Login </Link>
              </ul>             
            </div> 
        </div>
        
      
    )
}

export default Navbar;