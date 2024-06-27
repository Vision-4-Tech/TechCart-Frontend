import { React, useEffect, useState } from "react";

import "./ItemCard.css";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import { useLocation } from "react-router-dom";
import {Snackbar} from "@mui/material";
import { useNavigate } from "react-router-dom";
const ItemCard = () => {
  const [open, setOpen] = useState(false);
  const [cartNumber, setCartNumber] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [total,setTotal]=useState(0);
  const [cartid,setCartid]=useState(0);
  const [cart,setCart]=useState(0);
  // const [sessionid,setSessionId]=useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [deleteInitiated, setDeleteInitiated] = useState(false);
  const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
console.log(formattedDate);
  const [result,setResult]=useState({});
  const [show,setShow]=useState(false);
 
  const state= location.state  ;
  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const userDetails = localStorage.getItem('userDetails');
  
  useEffect(() => {
    // Check if user details exist in localStorage
    const userDetails = localStorage.getItem('userDetails');

    if (userDetails==null) {
      // Navigate to login page if userDetails are not found
      navigate('/login');
    } else {
      // Parse userDetails from localStorage and update state
      const parsedUserDetails = JSON.parse(userDetails);
      setUserData({
        name: parsedUserDetails.name || '',
        email: parsedUserDetails.email || '',
        phone: parsedUserDetails.phone || '',
        password: parsedUserDetails.password || ''
      });
    }
  }, [navigate]);

  const cart_no = localStorage.getItem("cartno")?localStorage.getItem("cartno"):"";
  console.log(cart_no)
  const calculateTotal = () => {
    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += parseFloat(item.Price*item.Quantity) || 0;
    }
    return totalAmount;
  };
  useEffect(()=>{
    const newTotal = calculateTotal();
    setTotal(newTotal);
        
  })

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShow(false);
    window.location.reload;
  };
  useEffect(() => {
    session();
    if (result.msg) {
      const sessionid2=localStorage.getItem("sessionId")
      // Ensure deleteCart is called only once
      if (!deleteInitiated) {
        setDeleteInitiated(true);
        const historyData = {
          date: formattedDate,
          Cartno: cart_no,
          Name: userData.name,
          Phone: userData.phone,
          Email: userData.email,
          OrderId: result.orderId,
          Amount: "5000",
          Payment:result.msg,
          SessionId:sessionid2,
        };
  
        fetch("https://tech-cart-one.vercel.app/histories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(historyData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("History API Response:", data);
          })
          .catch((error) => {
            console.error("Error calling /histories API:", error);
          });
          const TransactionData = {
            date: formattedDate,
            SessionId:sessionid,
            Cartno: cartid,
            Name: userData.name,
            Phone: userData.phone,
            Email: userData.email,
            OrderId: result.orderId,
            TransactionId:result.paymentId,
            Products:cartItems,
            Amount: "5000"
            
          };
    
          fetch("https://tech-cart-one.vercel.app/Transactions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(TransactionData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("History API Response:", data);
            })
            .catch((error) => {
              console.error("Error calling /transactions API:", error);
            });
        deleteCar(cart_no);
        deleteCart();
        
        localStorage.removeItem('cartno');
        
        setCartItems([]);
        
        localStorage.removeItem('sessionId')
        
        window.location.reload;
      }
      setCartNumber();
      window.location.reload;
      setShow(true);
      window.location.reload;
      
    }
  }, [result.msg, deleteInitiated]);

  const deleteCar=async(cartid)=>{
    
    // Replace '123456789' with the cartno you want to delete
    console.log(cartid)
    const cartn=parseInt(cartid)
    console.log(cartn);
    try {
      console.log("started")
    const response = await fetch(`https://tech-cart-one.vercel.app/api/carts/${cartn}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    // Send cartno in the request body
    });

    console.log(response); // Log success message from the server
    console.log("Deleted") // Log deleted item details if needed
  } catch (error) {
    console.log(error)
    // Handle error: log error message from server response
  }

  }

  const deleteCart = async () => {

    const cartno=localStorage.getItem("cartno")
    if(cartno==0){
      return;
    }
    try {
      const response = await fetch(`https://tech-cart-one.vercel.app/deleteCart/${cartno}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(cartno);
      if (response.ok) {
        localStorage.removeItem("sessionId");
       
        const data = await response.json();
        console.log(data);
        setCartItems([]);
        window.location.reload;
      } else {
        const errorMessage = await response.text();
        console.error(`Error deleting cart: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  useEffect(() => {

    console.log(cart_no)
    if (!cart_no || cart_no==0) {
      console.log("Cart number is empty. Skipping API call.");
      return;
    }
  
    const fetchData = async () => {
      try {
        const response = await fetch("https://tech-cart-one.vercel.app/TempItems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartNumber: cart_no,
          }),
        });
  
        if (response.ok) {
          const datas = await response.json();
          console.log(datas)
          const data = datas.items;
          setCartItems(data);
          console.log("Items:", cartItems);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };
  
    // Call fetchData initially
    fetchData();
   session();
    // Set up an interval to call fetchData every two seconds
    const intervalId = setInterval(fetchData, 1000);
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [cart, cart_no]);
  
  const session=async()=>{
    if(cart_no==0){
      return
    }
    const response = await fetch("https://tech-cart-one.vercel.app/TempItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartNumber: cart_no,
      }),
    });
         if(response.ok){
          console.log(cart_no)
          const datas = await response.json();
          console.log(datas.sessionId)
       
          localStorage.setItem("sessionId",datas.sessionId);
         
             
         }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const amount=total;
  const currency="INR";
  const receiptId="qryaq1";

  const handleSubmit =async (event) => {

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log("form",formJson)
    let cart_no = formJson.cart_no;
    
    handleClose();
    // Navigate to '/Cart' with props as email
    const cart_number_id=cart_no;
    if(cart_no==cart_number_id){
      const response = await fetch("https://tech-cart-6em1.vercel.app/CartNo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CustId:1,
          CartNo:cart_no
        }),

      });
      if(response.status===200){
        
        localStorage.setItem("cartno",cart_no);
        setCartid(localStorage.getItem("cartno")?localStorage.getItem("cartno"):0);
        
      }
      else{
        alert("Cart Already in Use");
      }
      }
    }
 const paymentHandler=async (e)=>{
  console.log("payment start")
        const response = await fetch("https://tech-cart-one.vercel.app/order",{
             method:"POST",
             body:JSON.stringify({
              amount,
              currency,
             receipt: receiptId
             }),
             headers:{
              "COntent-Type":"application/json",
             },
        });
        const order=await response.json();
        console.log("order",order);
        console.log(order.id);
        var options = {
          "key": "rzp_test_L1JPeGnZbS2ffv", 
          amount,
          currency,
          "name": "Tech Cart ", 
          "description": "Test Transaction",
          "image": "",
          "order_id": order.id, 
          "handler":async function  (response){
             const body={...response};
             const validateRes=await fetch("https://tech-cart-one.vercel.app/validate",{
              method:"POST",
              body:JSON.stringify(body),
              headers:{
                "Content-Type":"application/json"
              },
             });
             const jsonRes=await validateRes.json();
             setResult(jsonRes)

             console.log(jsonRes);
          },
          "prefill": { 
              "name": "Suhas", 
              "email": "suhas123.p@gmail.com", 
              "contact": "8792713154"   
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
      };
      var rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function (response){
              // alert(response.error.code);
              // alert(response.error.description);
              // alert(response.error.source);
              // alert(response.error.step);
              // alert(response.error.reason);
              // alert(response.error.metadata.order_id);
              // alert(response.error.metadata.payment_id);
      });

      rzp1.open();
      e.preventDefault();


 }
 
 
 const handleEnterKey = (e) => {
  if (e.key === 'Enter') {
    console.log('Cart Number entered:', cartNumber);
  }
};
  
  return (
    <div className="">
    <input
    type="text"
    placeholder="Enter Cart Number"
    value={cart_no}
    onChange={(e)=>setCart(e.target.value)}
    onKeyDown={handleEnterKey}
    onClick={handleClickOpen}
    className=" border border-zinc-950 rounded-lg focus:border-blue-500 focus:outline-none pl-3"
  />
   
  <Dialog
  open={open}
  onClose={handleClose}
  PaperProps={{
    component: 'form',
    onSubmit: handleSubmit,
  }}
>
  <DialogTitle>Cart Information</DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      required
      margin="dense"
      id="name"
      name="cart_no"
      label="Enter Cart number"
      type="text"
      fullWidth
      variant="standard"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button type="submit">OK</Button>
  </DialogActions>
</Dialog>
      <div className="details" style={{ color:'black',marginTop:'17px' }} >
        <table className="table">
          <thead style={{color:'white'}} className="">
          <tr>
          
            <th>Product</th>
            
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {cartItems && cartItems.map((item, id) => {
              return (
                <tr >
                {console.log(item)}
             
               <td>{item.Product}</td>
               <td>{item.Price}</td>
               
               <td>{item.Quantity}</td>
               <td>{item.Price*item.Quantity}</td>
               
    </tr>
              );
            })}
          </tbody>
        </table>
        <Snackbar
        open={show}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={`Payment Sucessfull ${result.msg}`}
      />
        {cartItems.length>0 && <h3 style={{display:'flex',  justifyContent:'flex-end',marginRight:'18rem'}}  className="m-5 text-lg">Total : {total}</h3>} 
        <div style={{display:'flex',justifyContent:'flex-end',marginRight:'17rem'}}>
        
        {cartItems.length>0 &&<Button variant="contained" onClick={paymentHandler}>Payment</Button>}
       
        </div>
        
      </div>
    </div>
  );
};

export default ItemCard;
