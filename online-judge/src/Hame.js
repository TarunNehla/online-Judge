import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LoginModal from './components/LoginModel';
import RegisterModal from './components/RegisterModel';
import DataTable from './DataTable';


const Home = () => {
  // State to store login and registration data
  const [loginData, setLoginData] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const [registerData, setRegisterData] = useState({
    registerName: '',
    registerEmail: '',
    registerPassword: '',
  });

  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  // Check local storage for token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');    
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      alert(data.message);

      if (response.status === 200) {
        // Store the token in local storage and update login state
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        setIsLoggedIn(true);
        setUserId(data.userId);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

    // Function to handle registration form submission
    const handleRegisterSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerData),
        });
  
        const data = await response.json();
        alert(data.message); // Display the response message (User registered successfully or Email is already registered)
      } catch (error) {
        alert('Error: ' + error.message);
      }
    };
  
    // Handle input changes for login and registration forms
    const handleInputChange = (e, formType) => {
      const { name, value } = e.target;
      if (formType === 'login') {
        setLoginData({ ...loginData, [name]: value });
      } else {
        setRegisterData({ ...registerData, [name]: value });
      }
    };
  
    const handleLogout = () => {
      // Remove the token from local storage and update login state
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    };
  
    return (
      <div>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <LoginModal handleLoginSubmit={handleLoginSubmit} handleInputChange={handleInputChange} />
        <RegisterModal handleRegisterSubmit={handleRegisterSubmit} handleInputChange={handleInputChange} />
        <DataTable isLoggedIn={isLoggedIn} userId={userId}  />
      </div>
    );
  };
  
  export default Home;