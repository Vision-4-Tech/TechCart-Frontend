import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import './style.css'
const Navbar = () => {
  const navigate = useNavigate();
 const Logout = () => {
   
   localStorage.removeItem("userDetails");
  
   navigate("/login");
 };

  return (
    <div className="headers">
      <div className='h1'>
        Dashboard
      </div>

      <div className='btn'>
        <Button variant="contained" className="logout" onClick={Logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Navbar