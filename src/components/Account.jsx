import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import './Account.css';
import { useUser } from './context/userContext';

const Account = () => {
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { user, clearUserDetails } = useUser();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

   


   const handleLogout = () => {
     clearUserDetails();
     localStorage.removeItem("userDetails");
     navigate("/signin"); // Redirect to login page
   };

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    const parsedUserDetails = userDetails ? JSON.parse(userDetails) : {};
    setUserData({
      name: parsedUserDetails.name || "",
      email: parsedUserDetails.email || "",
      phone: parsedUserDetails.phone || "",
      password: parsedUserDetails.password || ""
    });
  }, [navigate]);

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
   
  };

  const handleEdit = () => {
    console.log("edit");
    setEditMode(true);
  };

  useEffect(() => {
    console.log('Updated editMode:', editMode);
  }, [editMode]);
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
          onClick={handleLogout}
          style={{ marginTop: "25px" }}
        >
          Logout
        </Button>
      
    </div>
  );
};

export default Account;
