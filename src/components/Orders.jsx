
import axios from 'axios';
import React, { useEffect, useState } from 'react'





const Orders = () => {
    const [data,setData]=useState([])
    
    useEffect(() => {
      const data2= JSON.parse(localStorage.getItem('userDetails'))
      const id=data2._id;
      const apiUrl = "http://localhost:5000/histories/orders";

      axios
        .post(apiUrl, { id })
        .then((response) => {
          console.log("API response:", response.data);
          setData(response.data)
         
          
        })
        .catch((error) => {
          console.error("API error:", error);
        });
      
    
    },[]);
    
  return (
    <div>
      {data.map((item) => (
        <ul
          key={item._id}
          style={{
            display: "flex",
            gap: "12px",
            padding: "13px",
            margin: "13px",
            backgroundColor: "grey",
            justifyContent: "space-around",
            color: "black",
            fontSize: "22px",
          }}
        >
          <li>{item.Date}</li>{" "}
          <ul>
            {item.Products.map((product) => (
              <li
                key={product.Product}
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "space-around",
                  color: "black",
                  fontSize: "22px",
                }}
              >
              
                  <img
                    src={product.imageFile}
                    width={100}
                    height={100}
                    alt="Product Image"
                  />
                
                <div>Product: {product.Product}</div>{" "}
                <div>Price: {product.Price}</div>{" "}
              </li>
            ))}
          </ul>
        </ul>
      ))}
    </div>
  );
}

export default Orders