import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./context/userContext"; // Import useUser hook
import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";

const Header = () => {
  const { userDetails } = useUser(); // Get userDetails directly from context
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/account"); // Navigate to account page
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "linear-gradient(90deg, #4b6cb7, #182848)",
        color: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        padding: "10px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>AutoCartX</h1>

        {/* Navigation Links */}
        <nav>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "20px",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontSize: "1rem",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.color = "#FFD700")}
                onMouseOut={(e) => (e.target.style.color = "#fff")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontSize: "1rem",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.color = "#FFD700")}
                onMouseOut={(e) => (e.target.style.color = "#fff")}
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontSize: "1rem",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.color = "#FFD700")}
                onMouseOut={(e) => (e.target.style.color = "#fff")}
              >
                Orders
              </Link>
            </li>
            <li>
              {userDetails ? (
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  onClick={handleUserClick}
                  style={{ cursor: "pointer" }}
                >
                  {userDetails.name?.[0]}{" "}
                  {/* Display the first letter of the user's name */}
                </Avatar>
              ) : (
                <button onClick={() => navigate("/signin")}>Login</button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
