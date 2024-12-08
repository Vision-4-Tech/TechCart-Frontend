import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./Account.css";
import { useUser } from "./context/userContext";

const Account = () => {
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useUser(); // Access user details from context
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleLogout = () => {
    setUserDetails(null); // Clear user details from context
    localStorage.removeItem("userDetails"); // Optional, remove from localStorage
    navigate("/signin"); // Redirect to login page
  };

  // Update user data when the context value (userDetails) changes
  useEffect(() => {
    if (userDetails) {
      setUserData({
        name: userDetails.name || "",
        email: userDetails.email || "",
        phone: userDetails.phone || "",
        password: userDetails.password || "",
      });
    }
  }, [userDetails]); // Dependency on userDetails to update when it changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    setUserDetails(userData); // Save updated user data to context (and optionally localStorage)
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div className="account-container">
      <h2 className="account-title">Your Account Info</h2>
      <section className="user-details-form">
        <table className="user-details-table">
          <tbody>
            <tr>
              <td className="label">Name</td>
              <td>
                <TextField
                  disabled={!editMode}
                  id="name"
                  name="name"
                  value={userData.name}
                  variant="standard"
                  fullWidth
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td className="label">Email</td>
              <td>
                <TextField
                  disabled={!editMode}
                  id="email"
                  name="email"
                  value={userData.email}
                  variant="standard"
                  fullWidth
                  onChange={handleInputChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <Button
        variant="contained"
        onClick={handleEdit}
        style={{ marginTop: "25px", marginRight: "10px" }}
        disabled={editMode} // Disable edit button when in edit mode
      >
        Edit
      </Button>

      {editMode && (
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ marginTop: "25px", marginRight: "10px" }}
        >
          Save Changes
        </Button>
      )}

      <Button
        variant="contained"
        onClick={handleLogout}
        style={{ marginTop: "25px" }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Account;
