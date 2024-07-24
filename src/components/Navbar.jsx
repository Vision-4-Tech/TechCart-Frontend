import React, { useEffect, useState } from 'react'

import {useNavigate} from 'react-router-dom';

import './Navbar.css'
import {Button} from '@mui/material';
import {Box} from '@mui/material';
const Navbar = () => {
  const navigate=useNavigate();
  const [name,setName]=useState();

  useEffect(() => {
    // Check if user details exist in localStorage
    const userDetails = localStorage.getItem('userDetails');
    const parsedUserDetails = JSON.parse(userDetails) || ' ';
    setName(parsedUserDetails.name);
    if (userDetails==null) {
      // Navigate to login page if userDetails are not found
      navigate('/login');
    
    }
  }, [navigate]);
  const Logout=()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("orders")
    navigate("/login");
    
  }
  
  return (
    //
    <Box className="item-center justify-between p-11 flex ">
      <h2 className="font-bold text-2xl d-none d-sm-block">
        Tech Cart Innovators
      </h2>

      <Button variant="contained" className="" onClick={Logout}>
        Logout
      </Button>
    </Box>
  );
}

export default Navbar