import React from 'react';

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

export default LoginModal;
