import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Items = () => {
    const [Data,setData]=useState();
  useEffect(() => {
    
    const itemData = 1;

    // Make a POST request to the server
    axios.get('http://localhost:3000/users')
      .then(response => {
        console.log('Items retrieved successfully:', response.totalUsers);
       
         setData(response.data);
         
      })
      .catch(error => {
        console.error('Error retrieving items:', error);
      });
  }, []); 

  return (
    <div>
  Items
         {Data && Data.map((item)=>{
              return  <div>{item.items} {}</div>
         })}
    </div>
  );
};

export default Items;
