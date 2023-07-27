import { useState } from 'react';

const Session = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const login = () => {
    // Add your login logic here
    // For simplicity, we are just setting isLoggedIn to true
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const logout = () => {
    // Add your logout logic here
    // For simplicity, we are just setting isLoggedIn to false
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    login,
    logout,
  };
};

export default Session;
