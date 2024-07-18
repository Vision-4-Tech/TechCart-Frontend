
import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';

import SideBar from './SideBar'
import Navbar from './Navbar';




const Home = () => {
 
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
    <div style={{backgroundColor:'blue',color:'white'}}>
      <Navbar  /></div>
      <SideBar/>
    </div>
  );
};

export default Home;
