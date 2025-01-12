import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFound(props) {
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div>
            <h5 className="text-danger">
              404 | Not Found
            </h5>
            <div className="d-flex justify-content-center">
              <NavLink to='/' className="btn btn-sm btn-warning">Back To Home</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;