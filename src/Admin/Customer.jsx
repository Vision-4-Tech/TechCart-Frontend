import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
const Customer= () => {
  const [Customer, setCustomer] = useState([]);

  useEffect(() => {
    const apiUrl = "https://tech-cart-6em1.vercel.app/Customer";

    // Fetch data from the API directly inside the useEffect
    (async () => {
      try {
        const response = await axios.post(apiUrl);
        console.log(response.data)
        setCustomer(response.data);
        if (!response.ok) {
          throw new Error(`Error fetching data from ${apiUrl}: ${response.statusText}`);
        }
        const data = await response.json();
        
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    })();
  }, []);
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
