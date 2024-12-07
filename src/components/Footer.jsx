import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#343a40",
        color: "#fff",
        padding: "20px 0",
        textAlign: "center",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-start",
          flexWrap: "wrap",
          padding: "20px",
        }}
      >
        {/* About Us */}
        <div style={{ maxWidth: "300px", margin: "10px" }}>
          <h3 style={{ color: "#007bff", marginBottom: "10px" }}>About Us</h3>
          <p style={{ fontSize: "0.9rem", color: "#ccc", lineHeight: "1.6" }}>
            Tech Cart revolutionizes shopping with smart hardware and seamless
            payment integration. Efficient, eco-friendly, and customer-centric.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ maxWidth: "300px", margin: "10px" }}>
          <h3 style={{ color: "#007bff", marginBottom: "10px" }}>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: "0", color: "#ccc" }}>
            <li style={{ marginBottom: "8px" }}>
              <a href="#home" style={{ textDecoration: "none", color: "#007bff" }}>
                Home
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a
                href="#benefits"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                Benefits
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="#how-it-works" style={{ textDecoration: "none", color: "#007bff" }}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#contact" style={{ textDecoration: "none", color: "#007bff" }}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div style={{ maxWidth: "300px", margin: "10px" }}>
          <h3 style={{ color: "#007bff", marginBottom: "10px" }}>Contact Us</h3>
          <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
            Email: techcartv2@.com
          </p>
          <p style={{ fontSize: "0.9rem", color: "#ccc" }}>Phone: +91 8792713154</p>
          <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
            Address: Yelahanka, Bengaluru
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          borderTop: "1px solid #555",
          paddingTop: "10px",
          fontSize: "0.85rem",
          color: "#ccc",
        }}
      >
        © {new Date().getFullYear()} Tech Cart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
