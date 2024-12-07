import React from "react";
import Techimage from "./assets/Assets/Images/TechCart.jpg";
import '../App.css'
import { Link } from "react-router-dom";
import Benefits from "../Admin/Benefits";
import TechWork from "./TechWork";
import Footer from './Footer'
import LiveDemo from "./LiveDemo";
const NewHome = () => {
  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      {/* Background Image */}
      <img
        src={Techimage}
        alt="Tech Cart Background"
        style={{
          objectFit: "cover",
          height: "80vh",
          width: "100%",
          filter: "brightness(0.5)",
        }}
      />
     

      {/* Overlay Content */}
      <div
        style={{
          position: "absolute",
          bottom: "50%",
          left: "50px",
          height: "200px",

          color: "white",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
        }}
      >
        {/* Website Name */}

        {/* About Us */}
        <p
          style={{
            fontSize: "1.2rem",
            marginTop: "5rem",
            maxWidth: "600px",
            marginRight: "12px",
          }}
        >
          Tech Cart revolutionizes shopping with smart technology. Place items
          on our innovative cart, and watch as they’re scanned and displayed
          automatically on your account. Experience seamless payments and
          accurate billing—all in real-time!
        </p>

        {/* Demo Button */}
        <button className="demobtn" onClick={() => alert("Demo Coming Soon!")}>
          View Demo
        </button>
      </div>

      {/* Description Section */}
      <div
  className="details"
  style={{
    textAlign: "center",
    padding: "50px 20px",
    backgroundColor: "#f8f9fa",
  }}
>
  <h2
    className="heading"
    style={{
      fontSize: "2rem",
      color: "#007bff",
      marginBottom: "20px",
      fontWeight: "bold",
    }}
  >
    About
  </h2>
  <p
    style={{
      fontSize: "1.1rem",
      lineHeight: "1.6",
      maxWidth: "800px",
      margin: "0 auto",
      color: "#555",
    }}
  >
    Tech Cart combines cutting-edge hardware and software to make shopping
    efficient and user-friendly. With real-time item scanning and integrated
    online payments, it’s the future of hassle-free shopping.
  </p>
</div>


      <div className="details">
        <h2 className="heading" style={{ color: "#007bff",}}>Benefits</h2>
        <Benefits />
      </div>

      <div className="details">
        <h2 className="heading" style={{ color: "#007bff",}}>How tech Cart works</h2>
        <TechWork/>
      </div>

      <div className="details">
        <h2 className="heading" style={{ color: "#007bff",}}>Live Demo</h2>
        <LiveDemo/>
      </div>


      <Footer/>
    </div>
  );
};

export default NewHome;
