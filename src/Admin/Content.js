import { useState,useEffect } from "react";
import React from 'react'
import axios from 'axios'
import user_icon from '../components/assets/Assets/person.png'

const Content = ({selectedCategory}) => {
    const [data,setData]=useState("");
    const [items,setItems]=useState([]);
    const [itemcount,setItemCount]=useState(0);
   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://tech-cart-one.vercel.app/users');
            console.log('Items retrieved successfully:', response.data.totalUsers);
            setData(response.data.totalUsers);
          } catch (error) {
            console.error('Error retrieving items:', error);
          }
        };

        const fetchItems=async()=>{
            try {
                const response = await axios.get('https://tech-cart-vert.vercel.app/getItems');
                console.log(response.data)
                setItems(response.data);
        
                const itemCount = response.data.reduce((count, cart) => count + cart.items.length, 0);
                setItemCount(itemCount);
        
                // Log the updated itemcount after state is updated
                console.log(itemCount);
        
              }
            catch(error){
                console.log("Error")
            }
        }
        fetchItems();
    
        // Initial fetch
        fetchData();
    
        // Set up an interval to fetch data every 2 seconds
        const intervalId = setInterval(() => {
          fetchData();
          fetchItems();
        }, 1000);
    
        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
      }, []);
      const allItems = items.reduce((acc, cart) => acc.concat(cart.items), []);

  return (
    <div className='ml-12 mt-12'>
    <div><h2 className="text-xl font-bold">{selectedCategory}</h2></div>
    <div className="mt-8 flex flex-wrap  w-full">
         <div className=" m-[18px] flex shadow-xl h-auto  items-center  ">
              
              <img src={user_icon} className="m-[18px] "/>
              <div className="m-[24px]"><h2>Users  </h2>
              <p className="m-[4px]"> {data}</p></div>
          </div>
          <div className=" m-[18px] flex shadow-xl h-auto  items-center justify-center">
              <img src={user_icon} className="m-[18px]"/>
              <div className="m-[24px]"><h2>Orders  </h2>
              <p className="m-[4px]"> {itemcount}</p></div>
          </div>
          <div className=" m-[18px] flex shadow-xl h-auto  items-center justify-center">
              <img src={user_icon} className="m-[18px]"/>
              <div className="m-[24px]"><h2>Revenue  </h2>
              <p className="m-[4px]"> {itemcount}</p></div>
          </div>
       
    </div>
  
    <div className="mt-14 ">
    <div className="block " ><h2 className="text-xl font-bold">Orders</h2></div>

    <table className="table mt-12">
        <thead style={{color:'white'}}>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {allItems.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{parseInt(item.quantity)*parseInt(item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Content