import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const orderIdFromUrl = location.pathname.split('/details/')[1]; // Extract the orderId from the URL
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the Transaction API using orderId in the request body
        const response = await fetch(
          "https://tech-cart-6em1.vercel.app/OrderId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderId: orderIdFromUrl }),
          }
        );

        const data = await response.json();
        setTransactionData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [orderIdFromUrl]);

  return (
    <div style={{margin:'2rem'}}>
     <h1 className='font-bold'>Transaction Details</h1>
      <p style={{marginTop:'5px'}}>OrderId: {orderIdFromUrl}</p>
      
      <table className='table' style={{marginTop:'2rem',width:'50%'}}>
        <thead style={{color:'white'}}>
          <tr>
           
            
            <th>Cartno</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>TransactionId</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {transactionData.map((item) => (
            <tr key={item._id}>
              <td>{item.Cartno}</td>
              <td>{item.Name}</td>
              <td>{item.Phone}</td>
              <td>{item.Email}</td>
              <td>{item.TransactionId}</td>
              <td>{item.Amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className='font-bold' style={{marginTop:'2rem'}}>Products</h3>
      <table className='table' style={{marginTop:'1rem',width:'50%'}}>
        <thead style={{color:'white'}}>
           <th>Product Id</th>
           <th>Product</th>
           <th>Price</th>
           <th>Quantity</th>
           <th>Total</th>
        </thead>
        <tbody className='tbody'>
          {transactionData.map((transaction)=>(
          
            transaction.Products.map((product) => (
              <tr>
                <td>{product.product_id}</td>
                <td>{product.Product}</td>
                <td>{product.Price}</td>
                <td>{product.Quantity}</td>
                <td>{product.Price*product.Quantity}</td>
                </tr>
              ))
           
          ))}
          </tbody>
      </table>
    </div>
  );
};

export default Details;
