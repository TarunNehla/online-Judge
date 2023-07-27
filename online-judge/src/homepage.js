import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Session from './Session';
import DataTable from './DataTable';

const Header = ({ isLoggedIn, handleLogout }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Website
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {isLoggedIn ? (
              <li className="nav-item">
                <button type="button" className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#loginModal"
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#registerModal"
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

const LoginModal = ({ handleLoginSubmit, handleInputChange }) => {
  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">Login</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => handleLoginSubmit(e)}>
              <div className="form-group">
                <label htmlFor="loginEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  name="loginEmail"
                  placeholder="Enter email"
                  onChange={(e) => handleInputChange(e, 'login')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  name="loginPassword"
                  placeholder="Password"
                  onChange={(e) => handleInputChange(e, 'login')}
                />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterModal = ({ handleRegisterSubmit, handleInputChange }) => {
  return (
    <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="registerModalLabel">Register</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => handleRegisterSubmit(e)}>
              <div className="form-group">
                <label htmlFor="registerName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerName"
                  name="registerName"
                  placeholder="Enter name"
                  onChange={(e) => handleInputChange(e, 'register')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="registerEmail"
                  name="registerEmail"
                  placeholder="Enter email"
                  onChange={(e) => handleInputChange(e, 'register')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPassword"
                  name="registerPassword"
                  placeholder="Password"
                  onChange={(e) => handleInputChange(e, 'register')}
                />
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};





const Homepage = () => {
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

export default Homepage;