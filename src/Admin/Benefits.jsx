import React, { useState } from "react";
import accurate from "../components/assets/Benefits/Accurate.jpg";
import ecofriendly from "../components/assets/Benefits/ecofriendly.jpg";
import payments from "../components/assets/Benefits/payments.jpg";
import timeSave from "../components/assets/Benefits/timeSavejpg.jpg";
import "../App.css";

const Benefits = () => {
  const [details, setDetail] = useState([
    {
      heading: "Accurate Billing",
      image: accurate,
      paragraph: "Avoid human errors in tallying prices.",
    },
    {
      heading: "Eco-Friendly",
      image: ecofriendly,
      paragraph: "Reduced paperwork with digital receipts.",
    },
    {
      heading: "Seamless Payments",
      image: payments,
      paragraph:
        "Integrated with Razorpay or similar gateways for fast checkout.",
    },
    {
      heading: "Time-Saving",
      image: timeSave,
      paragraph: "No need to manually add items.",
    },
  ]);

  return (
    <div style={{ padding: "50px 20px", backgroundColor: "#f8f9fa" }}>
     
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "stretch",
          gap: "20px",
        }}
      >
        {details.map((item, index) => (
          <div
            key={index}
            style={{
              width: "300px",
              textAlign: "center",
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            className="benefit-card"
          >
            <div style={{ marginBottom: "20px" }}>
              <img
                src={item.image}
                alt={item.heading}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                  height: "200px",
                }}
              />
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                color: "#007bff",
                marginBottom: "10px",
              }}
            >
              {item.heading}
            </h3>
            <p style={{ fontSize: "1rem", color: "#555" }}>{item.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
