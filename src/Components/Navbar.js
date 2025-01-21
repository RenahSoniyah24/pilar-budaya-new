import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import User from '../Store';
import {
  removeSecureData,
  getSecureData,
  checkTokenValidity,
} from '../Utils/Protect';

function Navbar({ children, props }) {
  const { email } = useRecoilValue(User);
  const [user, setUser] = useRecoilState(User);
  const [userData, setUserData] = useState({});
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    try {
      removeSecureData();

      setUser({
        status: '',
        email: '',
        username: '',
        token: '',
      });

      history.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  const HandlingGetUserData = () => {
    const data = getSecureData();
    if (data) setUserData(data);
    else setUserData({});
  };

  useEffect(() => {
    HandlingGetUserData();
  }, [user]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: '#000', padding: '5px' }}
      >
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src="/assets/icon/logo.png" alt="Logo" width="100" />
            <img
              src="/assets/icon/text-logo.png"
              alt="Pilar Budaya"
              height="50"
              className="ms-2"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto fs-5">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="text-warning"
                  to="/profil"
                  exact
                >
                  Profil Sanggar
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="text-warning"
                  to="/informasi"
                  exact
                >
                  Informasi
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="text-warning"
                  to="/gallery"
                  exact
                >
                  Galeri Sanggar
                </NavLink>
              </li>
            </ul>
            <div className="d-flex">
              {checkTokenValidity ? (
                <>
                  {/* <div className='my-3 d-flex align-items-center'>{email}</div>
                    <NavLink className='btn btn-outline-warning btn-sm my-4 mx-2 px-4' to="/dashboard" exact>Dashboard</NavLink>
                    <button className='btn btn-danger btn-sm my-4 mx-2 px-4' onClick={logout}>Logout</button> */}

                  <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <img
                          className="rounded-circle me-lg-2"
                          src={`${process.env.PUBLIC_URL}/assets/icon/user.webp`}
                          alt=""
                          style={{ width: 40, height: 40 }}
                        />
                        <span className="d-none d-lg-inline-flex">
                          {userData?.username ?? ''}
                        </span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end bg-light rounded-0 rounded-bottom option-navbar-pilar m-0">
                        <NavLink to="/dashboard" className="dropdown-item">
                          Dashboard
                        </NavLink>
                        <NavLink to="/profile" className="dropdown-item">
                          My Profil
                        </NavLink>
                        <a href="#" onClick={logout} className="dropdown-item">
                          Log Out
                        </a>
                        <div className="dropdown-menu dropdown-menu-end bg-light rounded-0 rounded-bottom option-navbar-pilar m-0">
                          <NavLink to="/dashboard" className="dropdown-item">
                            Dashboard
                          </NavLink>
                          <NavLink to="/profile" className="dropdown-item">
                            My Profil
                          </NavLink>
                          <a href="#" onClick={logout} className="dropdown-item">
                            Log Out
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    className="btn btn-warning ms-3 px-4"
                    activeClassName="text-warning"
                    to="/register"
                    exact
                  >
                    Daftar
                  </NavLink>
                  <NavLink
                    className="btn btn-warning ms-3 px-4"
                    to="/login"
                    exact
                  >
                    Masuk
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}

export default Navbar;
