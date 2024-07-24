import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Signin.css';
import email_icon from '../components/assets/Assets/email.png';
import password_icon from '../components/assets/Assets/password.png';

import CircularProgress from "@mui/material/CircularProgress";

const Signin = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();


  const handlesubmit = (e) => {
  
       setLoading(true);
    e.preventDefault();
   
 
    axios
      .post("https://tech-cart-6em1.vercel.app/Login", { email, password })
      .then((result) => {
        console.log(result);
        console.log(result.data.name);

        setName(result.data.user.name);

        if (result.data.user.type === "user") {
          localStorage.setItem("user", result.data.name);
          localStorage.setItem("userDetails", JSON.stringify(result.data.user));
          setLoading(false);
          navigate("/home/hero", {
            state: {
              name: result?.data?.user?.name,
              email: result?.data?.user?.email,
              password: result?.data?.user?.password,
            },
          });
        } else if (result.data.user.type === "admin") {
          console.log(result.data.user.name);
          navigate("/Admin", { state: { name: result.data.user.name } });
        } else {
          setError(result.data);
        }
      })
      .catch((err) => console.log(err));
      setLoading(false);
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
                Don't have an account <span onClick={() => { navigate('/login'); }}> Click Here!</span>
               
              </div>
                                     
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
