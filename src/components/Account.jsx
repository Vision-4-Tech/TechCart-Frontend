import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

const Account = () => {
  const [editMode, setEditMode] = useState(false);
  const navigate=useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  useEffect(() => {
    // Retrieve userDetails from localStorage
    const userDetails = localStorage.getItem('userDetails');
    console.log(userDetails)
    // Parse userDetails into an object or use an empty object if userDetails is null or undefined
    const parsedUserDetails = userDetails ? JSON.parse(userDetails) : {};
    console.log(parsedUserDetails)
    // Update userData state with parsed user details
    setUserData({
      name: parsedUserDetails.name || "",
      email: parsedUserDetails.email || "",
      phone: parsedUserDetails.phone || "",
      password: parsedUserDetails.password || ""
    });
  }, [navigate]);
  

  const handleInputChange =async (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editMode);
    setEditMode(false);
    console.log('Updated user data:', userData);
  
  };
  

  const handleEdit = () => {
     console.log("edit");
     setEditMode(true);
    console.log(editMode)
  };

  useEffect(() => {
    console.log('Updated editMode:', editMode);
  }, [editMode]);

  return (
    <div className="account-container mx-auto max-w-2xl p-4">
      <h2 className="text-2xl font-bold text-center mb-8">Your Account Info</h2>
      
      <form className="user-details-form" onSubmit={handleSubmit}>
      <table className="user-details-table" style={{ margin: 'auto' }}>
        <tbody>
          <tr >
            <td className="label" style={{ paddingRight: '20px' }}>Name</td>
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
            <td className="label" style={{ paddingRight: '20px' }}>Email</td>
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
          <tr>
            <td className="label" style={{ paddingRight: '20px' }}>Phone</td>
            <td>
              <TextField
                disabled={!editMode}
                id="phone"
                name="phone"
                value={userData.phone}
                variant="standard"
                fullWidth
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label" style={{ paddingRight: '20px' }}>Password</td>
            <td>
              <TextField
                disabled={!editMode}
                id="password"
                name="password"
                type="password"
                value={userData.password}
                variant="standard"
                fullWidth
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {editMode && (
        <Button className="save-button mt-4 m-[25px]" style={{marginTop:'4rem' ,marginLeft:'18rem'}} variant="contained" type="submit">
          Save 
        </Button>
      )}

      {!editMode && (
        <Button className="edit-button mt-4 m-[25px]" variant="contained" style={{marginTop:'4rem' ,marginLeft:'18rem'}} type="button" onClick={handleEdit}>
          Edit
        </Button>
      )}
     
    </form>
    </div>
  );
};

export default Account;
