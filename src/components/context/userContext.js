import React, { createContext, useContext, useState, useEffect } from "react";

// Create context for user data
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Initialize userDetails from localStorage or default to null
  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    return savedUserDetails ? JSON.parse(savedUserDetails) : null;
  });

  useEffect(() => {
    if (userDetails) {
      // Persist userDetails in localStorage whenever it changes
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    } else {
      localStorage.removeItem("userDetails"); // Remove from localStorage if null
    }
  }, [userDetails]); // This will run every time userDetails is updated

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
