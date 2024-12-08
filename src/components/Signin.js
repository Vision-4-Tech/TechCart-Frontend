import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/context/userContext";
import "./Signin.css";
import email_icon from "../components/assets/Assets/email.png";
import password_icon from "../components/assets/Assets/password.png";
import { Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SnackbarComponent from "./Snackbar";

const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const { setUserDetails } = useUser(); // Use context to set user details
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      const { name, type } = JSON.parse(localStorage.getItem("userDetails"));
      if (!name) return;
      if (type === "user") {
        navigate("/home");
      } else {
        navigate("/Admin");
      }
    }
  }, []);

  const handlesubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    axios
      .post("https://tech-cart-6em1.vercel.app/Login", { email, password })
      .then((result) => {
        setSnackbarMessage("Logged in successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        setUserDetails(result.data.user); // Set user data in context

        localStorage.setItem("userDetails", JSON.stringify(result.data.user));

        setLoading(false);

        if (result.data.user.type === "user") {
          setTimeout(() => navigate("/"), 1000);
        } else {
          setTimeout(() => navigate("/admin/dashboard"), 1000);
        }
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data.message || "Login failed");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setLoading(false);
      });
  };

  const button = () => {
    if (loading) {
      return (
        <button type="button" className="submit" disabled>
          <CircularProgress />
        </button>
      );
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
            <div className="ml-28">{button()}</div>
            <div className="forgot-password">
              Don't have an account?{" "}
              <span onClick={() => navigate("/login")}>Click Here!</span>
            </div>
          </div>
        </form>
        <SnackbarComponent
          message={snackbarMessage}
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        />
      </div>
    </div>
  );
};

export default Signin;
