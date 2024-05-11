import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';


const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    

    const fetchData = async () => {
      try {
       
        const response = await axios.get('https://tech-cart-two.vercel.app/Inventoryitem');
        console.log('API Response:', response.data);
        setInventoryItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the async function
    fetchData();
  }, []); 

  return (
    <div style={{ marginTop: '3rem', marginLeft: '25px' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '23px' }}>Inventory</h1>
      <div className="details" style={{ color: 'black', marginTop: '2rem' }} >
        <table className="table">
          <thead style={{ color: 'white' }} className="">
            <tr>
              <th>ProductId</th>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="tbody">
          {Array.isArray(inventoryItems) && inventoryItems.length > 0 ? (
            inventoryItems.map((item, id) => (
              <tr key={id}>
                <td>{item.product_id}</td>
                <td>{item.Product}</td>
                <td>{item.Price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No inventory items available</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
