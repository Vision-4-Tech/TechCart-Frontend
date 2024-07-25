import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Signin.css';
import email_icon from '../components/assets/Assets/email.png';
import password_icon from '../components/assets/Assets/password.png';
import { Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SnackbarComponent from "./Snackbar";
const Signin = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [loading,setLoading]=useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const navigate = useNavigate();
  

  useEffect(()=>{
    if(localStorage.getItem("userDetails")){
        const {name,type}=JSON.parse(localStorage.getItem("userDetails"));
        if(!name){
            return
        }
        else{
          if(type=="user") {navigate("/home/hero")}
          else{
            navigate("/Admin")
          }
        }
      }
  },[])

  const handlesubmit = (e) => {
  
       setLoading(true);
    e.preventDefault();
   
 
    axios
      .post("https://tech-cart-6em1.vercel.app/Login", { email, password })
      .then((result) => {
        console.log(result);
        console.log(result.data.name);
          setSnackbarMessage("Logged in successfully");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        setName(result.data.user.name);

        if (result.data.user.type === "user") {
          localStorage.setItem("user", result.data.name);
          localStorage.setItem("userDetails", JSON.stringify(result.data.user));
          setLoading(false);
         
            setTimeout(() => {
              navigate("/home/hero"); // Navigate to home page after 3 seconds
            }, 3000);
         
        } else if (result.data.user.type === "admin") {
          console.log(result.data.user.name);
         setTimeout(() => {
           navigate("/admin/dashboard"); // Navigate to home page after 3 seconds
         }, 3000);
          
           localStorage.setItem(
             "userDetails",
             JSON.stringify(result.data.user)
           );
           


        } else {
          setError(result.data);
           setSnackbarMessage(
             result.data.message || "Registration failed"
           );
           setSnackbarOpen(true);
        }
      })
      .catch((err) =>{
         console.log("err",err.response)
         
         setSnackbarMessage(
           err.response.data.message || "Registration failed"
         );
         setSnackbarSeverity("error");
         setSnackbarOpen(true);
        }
        
        );
      setLoading(false);
  };

   const handleCloseSnackbar = () => {
     setSnackbarOpen(false);
   };
 const button = () => {
   if (loading) {
        return <button type="button"  className="submit"  disabled>
       <CircularProgress />
     </button>;
   } else {
     return (
       <button type="submit" className="submit">
         Login
       </button>
     );
   }
 };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Log In</div>
        <div className="underline"></div>
        {error && <h1>{error}</h1>}
        <form onSubmit={handlesubmit}>
          <div className="inputs">
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Enter the mail"
                autoComplete="off"
                name="email"
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Enter the password"
                autoComplete="off"
                name="password"
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="ml-28">{button()}</div>
              <div className="forgot-password">
                Don't have an account{" "}
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {" "}
                  Click Here!
                </span>
              </div>
            </div>
            <SnackbarComponent
              message={snackbarMessage}
              open={snackbarOpen}
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
