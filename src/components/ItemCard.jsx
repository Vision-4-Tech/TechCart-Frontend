import { React, useCallback, useEffect, useState } from "react";
import axios from 'axios'
import "./ItemCard.css";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import io from 'socket.io-client';
import DialogTitle from '@mui/material/DialogTitle';

import { useLocation } from "react-router-dom";
import {Snackbar} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartItems from "./CartItems";
const ItemCard = () => {

  const [open, setOpen] = useState(false);
  const [cartNumber, setCartNumber] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [total,setTotal]=useState(0);
  const [cartid,setCartid]=useState(0);
  const [responseId,setResponseId]=useState('');
  const [orderId,setOrderId]=useState('');
  const [cart,setCart]=useState(0);
  const [sessionid,setSessionId]=useState();
  const [price,setAmount]=useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [deleteInitiated, setDeleteInitiated] = useState(false);
  const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;

  const [result,setResult]=useState({});
  const [show,setShow]=useState(false);
 
  const state= location.state  ;
   const URL = "https://tech-cart-6em1.vercel.app";
  const [userData, setUserData] = useState({
    id:"",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

   const url = "https://socket-limk.onrender.com";

  useEffect(() => {
  
   const socket = io(url, {
     transports: ["websocket", "polling"], // Allow both transports
     withCredentials: true,
   });
    console.log("started to connect socket");
     socket.on("connect", () => {
       console.log("Connected to the server", socket.id);
     });

    socket.emit("joinCartRoom", cart_no);

    socket.on("cartUpdated", (updatedCart) => {
      console.log("Cart updated:", updatedCart.items);
      setCartItems(updatedCart.items);
    });

    socket.on(
      "disconnect",
      (reason) => {
        console.log("Disconnected:", reason);
      },
     
    );

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  },[cartid]);
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
        password: parsedUserDetails.password || '',
        id:parsedUserDetails._id||"",
      });
      console.log("id", parsedUserDetails._id);
     
    }
  }, [navigate]);

  const cart_no = localStorage.getItem("cartno")?localStorage.getItem("cartno"):"";
  
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
    // window.location.reload();
  };
  useEffect(() => {
    session();
    if (result.msg) {
      const sessionid2=localStorage.getItem("sessionId")
      // Ensure deleteCart is called only once
       const cartno=localStorage.getItem('cartno')
       console.log(cartno)
      if (!deleteInitiated) {
        setDeleteInitiated(true);
        const historyData = {
          id:userData.id,
          date: formattedDate,
          Cartno: cartno,
          Name: userData.name,
          Phone: userData.phone,
          Email: userData.email,
          OrderId: orderId,
          Amount: price,
          Payment:result.msg,
          SessionId:sessionid2,
        };
  
        fetch(`${URL}/histories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(historyData),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log("History API Response:", data);
            localStorage.removeItem("sessionId");
          })
          .catch((error) => {
            console.error("Error calling /histories API:", error);
          });
          console.log(orderId)
          const TransactionData = {
            id:userDetails._id,
            Date: formattedDate,
            SessionId:sessionid,
            Cartno: cartno,
            Name: userData.name,
            Phone: userData.phone,
            Email: userData.email,
            OrderId: orderId,
            TransactionId:responseId,
            Products:cartItems,
            Amount: price
            
          };
    
          fetch(`${URL}/Transactions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(TransactionData),
          })
            .then((response) => response.json())
            .then((data) => {
              
              
            })
            .catch((error) => {
              // console.error("Error calling /transactions API:", error);
            });
        
        

        deleteCart();
        deleteCar(cart_no);
        setCartid();

        setCartItems([]);

      }
     
      
      setShow(true);
     
       
    }
  }, [result.msg, deleteInitiated]);

  const deleteCar=async(cartid)=>{
    
    // Replace '123456789' with the cartno you want to delete
    
    const cartn=parseInt(cartid)
    
    try {
      console.log("started")
    const response = await fetch(`${URL}/api/carts/${cartn}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    // Send cartno in the request body
    });

  // Log deleted item details if needed
  } catch (error) {
    console.log(error)
    // Handle error: log error message from server response
  }

  }

  const deleteCart = async () => {

    const cartno=localStorage.getItem("cartno")
    console.log(cartno)
    if(cartno==0){
      return;
    }
    try {
      const response = await fetch(`${URL}/deleteCart/${cartno}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
     
      if (response.ok) {
        localStorage.removeItem("sessionId");
           localStorage.removeItem("cartno");
           
        const data = await response.json();
      
        setCartItems([]);
        // window.location.reload();
      } else {
        const errorMessage = await response.text();
        console.error(`Error deleting cart: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  useEffect(() => {

   
    if (!cart_no || cart_no==0) {
      console.log("Cart number is empty. Skipping API call.");
      return;
    }
  
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/TempItems`, {
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
          
        } else {
          setCartItems([]);
          return
        }
      } catch (error) {
        console.error("Network error:", error);
        return
      }
    };
  
  
    fetchData();
   session();
  
  },[cartid]);


  const items=useCallback(()=>{
       return cartItems;
  },[cartItems])
  
  const session=async()=>{
    console.log(cart_no)
    if(cart_no==0){
      return
    }
    const response = await fetch(`${URL}/TempItems`, {
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
      const response = await fetch(`${URL}/CartNo`, {
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

    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
    
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
    
        document.body.appendChild(script);
      });
    };
 const paymentHandler=async (e)=>{
  let data=JSON.stringify({
    amount:amount,
    currency:'INR'
  })

  let config={
    method:"post",
    maxBodyLength:Infinity,
    url:`${URL}/order`,
    headers:{
            'Content-Type':'application/json'
    },
    data:data
  }

  axios.request(config)
  .then((response)=>{
    console.log(response.data.id)
    setOrderId(response.data.id)
  
    console.log(JSON.stringify(response.data));
    const data=JSON.stringify(response.data.amount)
    setAmount(data)
     handleRazorpayScreen(response.data.amount)
  })
  .catch((error)=>{
    console.log("error",error)
  })
      
 }
 const handleRazorpayScreen=async(amount)=>{
  console.log("started Screen")
  const res =await loadScript("https://checkout.razorpay.com/v1/checkout.js")
  console.log(res)

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }
  
  const options={
    key:"rzp_test_L1JPeGnZbS2ffv",
    amount:amount*100,
    currency:'INR',
    name:"Tech Cart",
    description:"payment to tech cart",
    image:"image",
    handler:async function  (response){
      const body={...response};
      console.log(response)
      console.log(response.razorpay_payment_id);
       setResponseId(response.razorpay_payment_id)
      const validateRes=await fetch(`${URL}/validate`,{
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
    prefil:{
      name:"Suhas",
      email:"suhas123.p@mail.com"
    },
    theme:{
      color:"#F4C430"
    }
  }

  console.log("open")
  const paymentObject=new window.Razorpay(options)
  console.log(paymentObject)
  paymentObject.open();
//   console.log(responseId);
}


// const handleEnterKey = (e) => {
//   if (e.key === 'Enter') {
//     console.log('Cart Number entered:', cartNumber);
//   }
// };
 
 const handleEnterKey = (e) => {
  let data=JSON.stringify({
    amount:amount,
    currency:'INR'
  })

  let config={
    method:"post",
    maxBodyLength:Infinity,
    url:`${URL}/order`,
    headers:{
            'Content-Type':'application/json'
    },
    data:data
  }

  axios.request(config)
  .then((response)=>{
    console.log(JSON.stringify(response.data));
    console.log(response.data.amount)
     handleRazorpayScreen(response.data.amount)
  })
  .catch((error)=>{
    console.log("error",error)
  })
}
  
  return (
    <div className="">
      <h1 className="cart">Cart</h1>
      <TextField
        type="text"
        variant="outlined"
        autoFocus={cartid>0?false:true}
        label="Enter Cart Number"
        value={cart_no}
        onChange={(e) => setCart(e.target.value)}
        onKeyDown={handleEnterKey}
        onClick={handleClickOpen}
        className=" border border-zinc-950 rounded-lg focus:border-blue-500 focus:outline-none pl-3"
      />

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
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
      <div className="details" style={{ color: "black", marginTop: "17px" }}>
        <CartItems items={items()} />
        <Snackbar
          open={show}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          message={`Payment Sucessfull `}
        />
      </div>
      {cartItems.length > 0 && (
        <h3
          style={{
            fontWeight: "bold",
            fontSize: "23px",
            display: "flex",
            justifyContent: "center",
          }}
          className="m-5 text-lg"
        >
          Total : {total}
        </h3>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {cartItems.length > 0 && (
          <Button
            style={{
              fontWeight: "bold",
              fontSize: "20px",
            }}
            variant="contained"
            className="payment"
            onClick={paymentHandler}
          >
            Payment
          </Button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
