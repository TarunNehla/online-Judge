import React from 'react';

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

export default RegisterModal;
