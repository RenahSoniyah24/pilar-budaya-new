import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import User from '../../../Store';
import '../../../style/css/style.css';

function NavbarAdmin({ sidebar, onEmit }) {
  const [user, setUser] = useRecoilState(User);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const history = useHistory();

  const toggleSidebar = () => {
    onEmit(!sidebar);
  };

  const logout = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('status', false);
      localStorage.setItem('email', '');
      localStorage.setItem('username', '');
      localStorage.setItem('token', '');

      setUser({
        status: localStorage.getItem('status'),
        email: localStorage.getItem('email'),
        username: localStorage.getItem('username'),
        token: localStorage.getItem('token'),
      });

      history.push('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
        <a href="#" className="sidebar-toggler flex-shrink-0" onClick={toggleSidebar}>
          <i className="fa fa-bars" />
        </a>
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
              <span className="d-none d-lg-inline-flex">John Doe</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-light rounded-0 rounded-bottom option-navbar-pilar m-0">
              <NavLink to="/profile" className="dropdown-item">
                My Profil
              </NavLink>
              <a href="#" onClick={logout} className="dropdown-item">
                Log Out
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
}

export default NavbarAdmin;
