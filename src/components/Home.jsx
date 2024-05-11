
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Items from './items';
import SideBar from './SideBar';
import Navbar from './Navbar';
import Button from '@mui/material/Button';

import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();


  
  useEffect(() => {
    // Check if user details exist in localStorage
    const userDetails = localStorage.getItem('userDetails');

    if (userDetails==null) {
      // Navigate to login page if userDetails are not found
      navigate('/login');
    
    }
  }, [navigate]);


  

 

  return (
    <div>
      
      
      
      <Navbar  />
      <SideBar/>
    </div>
  );
};

export default Home;
