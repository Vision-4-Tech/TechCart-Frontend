import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import user_icon from '../components/assets/Assets/person.png'
import email_icon from '../components/assets/Assets/email.png'
import password_icon from '../components/assets/Assets/password.png'
import './Signup.css'

import Switch from '@mui/material/Switch';

import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';

  

const  Signup=()=>{

  const [name,setName]=useState();
  const [email,setemail]=useState();
  const [password,setpassword]=useState();
  const [secretkey,setSecretKey] = useState();
  const [correct,setCorrect]=useState(false);
  const navigate=useNavigate();
  const [ error,setError]=useState("");
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [type,setType]=useState("admin")
  const handleAdminSwitchChange = () => {
    setIsAdminChecked(!isAdminChecked);
    if(isAdminChecked===false){
      setType("user")
    }
    else{
      setType("admin")
    }
  };
  
  
  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));
  

 
  const handlesubmit=(e)=>{
    
    
      e.preventDefault();
      console.log('start');

      axios.post(' https://tech-cart-6em1.vercel.app/Register',{name,email,password,secretkey,type})
      .then(result=>{

        if(result.data.message==="Invalid secret key" || result.data.message==="Record already exists for this email" ){
          console.log(result.data.message)
             setError(result.data.message)
         }
         else{
          navigate('/');
         }
        {console.log(result)} })
      .catch(err=>console.log(err))
  }
  return(
    <div className="container">
      
    <div className="header">
      <div className="text">Sign Up</div>
      
      <div className="underline"></div>
      <div className="flex flex-row">
      
     

      {/* First iOS-style switch labeled as "Admin" */}
      <div direction="row" spacing={1}  className="flex">
        <h1>Admin</h1>
        <IOSSwitch sx={{ m: 1 }} checked={!isAdminChecked} onChange={handleAdminSwitchChange} />
      </div>

      {/* Second iOS-style switch labeled as "User" */}
      <div direction="row" spacing={1}  className="flex">
        <h1>User</h1>
        <IOSSwitch sx={{ m: 1 }} checked={isAdminChecked} onChange={handleAdminSwitchChange} />
      </div>

      
    </div>
    {console.log(error)}
      {error && <h2>{error}</h2>}{correct && <h2>Secret Key is Invalid</h2>}
      <form  onSubmit={handlesubmit}>
         <div className="inputs">


         {!isAdminChecked && 
          <div className="input">
          <img src={password_icon} alt=""/>
              <input  
                type="password"
                placeholder="Enter the secret key"
                autoComplete="off"
                name="password"
                onChange={(e)=>setSecretKey(e.target.value)}
                required
                 
              />
          </div>}
      
      <div className="input">
            <img src={user_icon}></img>
             <input  
               type="text"
               placeholder="Enter Name"
               autoComplete="off"
               name="email"
                  onChange={(e)=>setName(e.target.value)}
                  required
             />
         </div>
          
        
        
         <div className="input">
             <img src={email_icon} alt=""/>
             <input  
               type="email"
               placeholder="Enter the mail"
               autoComplete="off"
               name="email"
               onChange={(e)=>setemail(e.target.value)}
               required
             />
         </div>
         <div className="input">
             <img src={password_icon} alt=""/>
             <input  
               type="password"
               placeholder="Enter the password"
               autoComplete="off"
               name="email"
               onChange={(e)=>setpassword(e.target.value)}
               required
             />
         </div>
         <div>
         <button type="submit>" className="submit">Register</button>
         <div className="forgot-password">Already have an Account ? <span onClick={()=>{navigate('/')}}> Click Here!</span></div>
        
         </div></div>
      </form>
    </div>
    </div>
)}
export default Signup;
