import React from "react";
import FlipIcon from '@mui/icons-material/Flip';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
const TechWork = () => {
  return (
    <div style={{ padding: "50px 0", backgroundColor: "#f8f9fa" }}>
    

      {/* Steps Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        //   marginTop: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* Step 1: Scan Items */}
        <div
          style={{
            width: "300px",
            textAlign: "center",
            margin: "20px",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
              <FlipIcon style={{ width: "50px", height: "50px", marginBottom: "20px" }}/>

          
          <h3 style={{ fontSize: "1.5rem", color: "#007bff" }}>Scan Items</h3>
          <p style={{ fontSize: "1rem", color: "#555" }}>
            The smart cart automatically detects items placed on it.
          </p>
        </div>

        {/* Step 2: Track in Real-Time */}
        <div
          style={{
            width: "300px",
            textAlign: "center",
            margin: "20px",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
        <TrackChangesIcon  style={{ width: "50px", height: "50px", marginBottom: "20px" }}/>
         
          <h3 style={{ fontSize: "1.5rem", color: "#007bff" }}>
            Track in Real-Time
          </h3>
          <p style={{ fontSize: "1rem", color: "#555" }}>
            Your items appear instantly on our website with pricing and details.
          </p>
        </div>

        {/* Step 3: Easy Checkout */}
        <div
          style={{
            width: "300px",
            textAlign: "center",
            margin: "20px",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >

        <CreditScoreIcon  style={{ width: "50px", height: "50px", marginBottom: "20px" }}/>
         
          <h3 style={{ fontSize: "1.5rem", color: "#007bff" }}>
            Easy Checkout
          </h3>
          <p style={{ fontSize: "1rem", color: "#555" }}>
            Complete your payment securely online or at the store.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechWork;
