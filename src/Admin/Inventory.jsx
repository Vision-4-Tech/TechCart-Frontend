import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './style.css';
import { Button } from '@mui/material';
const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [productId,setProductId]=useState(0);
  const [productName,setProductName]=useState("");
  const [price,setPrice]=useState(0);
  const [imageFile,setImageFile]=useState("");
 
  useEffect(() => {
    

    const fetchData = async () => {
      try {
       
        const response = await axios.get('https://tech-cart-one.vercel.app/Inventoryitem');
        console.log('API Response:', response.data);
        setInventoryItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the async function
    fetchData();
  }, [open]); 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleProductId = (e) => {
    console.log(e)
    const { name, value } = e.target;
    console.log(value)
    setProductId(value);
    console.log(productId);
  };
 const handleProductName = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setProductName(value);
    console.log(productName);
  };
  const handlePrice = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setPrice(value);
    console.log(price);
  };

  const handleImageChange = (e) => {
    var reader =new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=()=>{
      console.log(reader.result);
      setImageFile(reader.result);
    };
    reader.onerror=error=>{
      console.log("Error",error);
    }
    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log(productId);
     console.log(productName);
     console.log(price);
     console.log(imageFile);
    
    if(productId===0 ||productName==="" || price===0){
      return
    }
    try {
      
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id:productId,
          Product:productName,
          Price:price,
          imageFile:imageFile
        }),

      });
      setOpen(false);
      if(response.status===200){
        
        response.body("Product Inserted Successfully")
        setProductId(0);
        setProductName("");
        setPrice(0);
        
      }
      else{
        response.body("Not inserted");
      }
      }
    
catch (error) {
      console.error('Error sending product data:', error);
    }
  };


  return (
    <div style={{ marginTop: '3rem', marginLeft: '25px' }}>
    <Dialog
  open={open}
  onClose={handleClose}
  PaperProps={{
    component: 'form',
    // onSubmit: handleSubmit,
  }}
>
  <DialogTitle>Add Items</DialogTitle>
  <DialogContent>
    <TextField
    autoFocus
    required
    margin="dense"
    id="productId"
    name="productId"
    label="Enter product Id"
    type="text"
    fullWidth
    variant="standard"
    onChange={handleProductId}
    
    />
    <TextField
    required
    margin="dense"
    id="price"
    name="price"
    label="Enter Product Name"
    type="text"
    fullWidth
    variant="standard"
    onChange={handleProductName}
    />
    <TextField
      autoFocus
      required
      margin="dense"
      id="price"
      name="price"
      label="Enter price"
      type="text"
      fullWidth
      variant="standard"
      onChange={handlePrice}
    />
    <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
  />
  
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} variant='contained'>Cancel</Button>
    <Button type="submit" onClick={handleSubmit} variant='contained'>OK</Button>
  </DialogActions>
</Dialog>
    <div style={{display:'flex',justifyContent:'space-between'}}>
      <h1 style={{ fontWeight: 'bold', fontSize: '23px' }}>Inventory</h1>
      <Button variant="contained" onClick={handleClickOpen}>Add Item</Button>
      </div>
      
      <div className="details" style={{ color: 'black', marginTop: '2rem' }} >
      <table className="table" style={{width:'100%'}}>
      <thead style={{ color: 'white' }}>
        <tr>
          <th>Image</th>
          <th>ProductId</th>
          <th>Product</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody className="tbody">
        {Array.isArray(inventoryItems) && inventoryItems.length > 0 ? (
          inventoryItems.map((item, id) => (
            <tr key={id}>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                {item.imageFile && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={item.imageFile} width={100} height={100} alt="Product Image" />
                  </div>
                )}
              </td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.product_id}</td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.Product}</td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.Price}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: 'center' }}>No inventory items available</td>
          </tr>
        )}
      </tbody>
    </table>
    
      </div>
      
    </div>
  );
};

export default Inventory;
