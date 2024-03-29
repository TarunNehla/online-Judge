import React, { useState } from 'react';
import Header from './components/Header';
import LoginModal from './components/LoginModel';
import RegisterModal from './components/RegisterModel';
import Session from './Session'; // Assuming Session.js exists
import DataTable from './DataTable';



const Home = () => {
    const session = Session();
  
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
          // Update the session state upon successful login
          session.login();
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
      session.logout(); // Call the logout function from the session component
    };
  
    return (
      <div>
        <Header isLoggedIn={session.isLoggedIn} handleLogout={handleLogout} />
        <LoginModal handleLoginSubmit={handleLoginSubmit} handleInputChange={handleInputChange} />
        <RegisterModal handleRegisterSubmit={handleRegisterSubmit} handleInputChange={handleInputChange} />
        <DataTable />
      </div>
    );
  };
  
  export default Home;
