import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
const Customer= () => {
  const [Customer, setCustomer] = useState([]);
  const [loading,setLoading]=useState(false)
  useEffect(() => {

    const apiUrl = "https://tech-cart-6em1.vercel.app/Customer";

    // Fetch data from the API directly inside the useEffect
    (async () => {
      try {
        setLoading(true)
        const response = await axios.post(apiUrl);
        console.log(response.data)
        setCustomer(response.data);
        if (!response.ok) {
          throw new Error(`Error fetching data from ${apiUrl}: ${response.statusText}`);
        }
        const data = await response.json();
        setLoading(false)
        
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    })();
  }, []);

  if(loading){
     return (
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </h1>
    );
     
  }
  
  return (
    <div style={{marginTop:'3rem',marginLeft:"25px"}}>
      <h1 style={{fontWeight:'bold',fontSize:'23px'}}>Customer</h1>
      <div className="details" style={{ marginTop:'2rem'}} >
      <table className="table">
        <thead style={{color:'white'}} className="">
        <tr>
          <th>Customer Name</th>
          
          <th>Gmail</th>
       
          </tr>
        </thead>
        <tbody className="tbody">
          { Customer && Customer.map((item, id) => {
            return (
              <tr key={id}>
                {console.log(item)}
                <td>
                  {item.name}
                  {item.type == "admin" ? " (admin)":" (user)"}
                </td>
                <td>
                  {item.email}
                
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Customer;
