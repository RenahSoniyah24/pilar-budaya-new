import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Auth } from '../Context/Auth';
import Authenticated from '../Context/Authenticated';
import User from '../Store';

function Navbar({ children , props}) {
  const {name}            = useRecoilValue(User)
  const [user, setUser]   = useRecoilState(User)
  const history           = useHistory()

  const logout = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('status', false)
      localStorage.setItem('nama', '')

      setUser({
        status : localStorage.getItem('status'),
        name   : localStorage.getItem('nama')
      })

      history.push('/login')
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    console.log(user)
  },[user])

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{backgroundColor: "#000"}}
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
                <NavLink className='nav-link' activeClassName='text-warning' to="/profil" exact>Profil Sanggar</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className='nav-link' activeClassName='text-warning' to="/informasi" exact>Informasi</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className='nav-link' activeClassName='text-warning' to="/gallery" exact>Galeri Sanggar</NavLink>
              </li>

              {
                user.status === 'true' ?
                  <>
                    {/* <NavLink className='nav-link' activeClassName='text-warning' to="/list">List Data</NavLink> */}
                  </>
                :
                  <></>
              }
            </ul>
            <div className="d-flex">
              <NavLink className="btn btn-warning ms-3 px-4" activeClassName='text-warning' to="/register" exact>Daftar</NavLink>
              <NavLink className="btn btn-warning ms-3 px-4" to="/login" exact>Masuk</NavLink>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}

export default Navbar;