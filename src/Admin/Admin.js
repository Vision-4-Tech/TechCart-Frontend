import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Content from './Content'
import Footer from './Footer'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'


const Admin = () => {
const navigate = useNavigate();

  const user=localStorage.getItem("userDetails")
  console.log(user)


 useEffect(() => {
   // Check if user details exist in localStorage
   const userDetails = localStorage.getItem("userDetails");

   if (userDetails == null) {
     // Navigate to login page if userDetails are not found
     navigate("/login");
   }
 }, [navigate]);

  if(user){
    const data=JSON.parse(user)
    console.log(data)
    const type=data.type;
    console.log(type);
  }
 
  const [selectedCategory,setSelectedCategory]=useState("Dashboard");
  
  return (
    <div>
      <Navbar/>
      <div >
       <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
     
        
      </div>
      
      <Footer/>
    </div>
  )
}

export default Admin