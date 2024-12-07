import { createContext, useState, useContext } from "react";

// Create a Context
export const UserContext = createContext();

// Create a custom hook to use the context
export const useUser = () => {
  return useContext(UserContext);
};

// Create a provider to wrap the components and provide context values
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserDetails = (userData) => {
    setUser(userData);
  };

  const clearUserDetails = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUserDetails, clearUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
