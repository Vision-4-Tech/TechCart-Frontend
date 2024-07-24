import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Content from './Content'
import Footer from './Footer'

import { useState } from 'react'


const Admin = () => {


  const user=localStorage.getItem("userDetails")
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