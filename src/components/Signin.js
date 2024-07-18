import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Signin.css';
import email_icon from '../components/assets/Assets/email.png';
import password_icon from '../components/assets/Assets/password.png';

const Signin = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log('start');
    
    axios.post('https://techcartbackend-zp4w.onrender.com/Login', { email, password })
      .then(result => {
        console.log(result);
        console.log(result.data.name);

        setName(result.data.name);
        
        if (result.data.type === "user") {
          localStorage.setItem('user',result.data.name);
          localStorage.setItem("userDetails",JSON.stringify(result.data));
          navigate('/home/hero', { state: { name: result?.data?.name,email:result?.data?.email,password:result?.data?.password } });
        } else if (result.data.type === "admin") {
          console.log(result.data.name);
          navigate('/Admin', { state: { name: result.data.name } });
        } else {
          setError(result.data);
        }
      })
      .catch(err => console.log(err));
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
              <div className="ml-28"><button type="submit" className="submit">Login</button></div>
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
