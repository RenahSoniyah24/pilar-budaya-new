import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { NavLink } from 'react-router-dom';
import User from '../../../Store';
import { FaFileAlt, FaRegUser, FaWallet } from "react-icons/fa";
import { GiPieChart } from "react-icons/gi";
import { getSecureData } from '../../../Utils/Protect';

function SidebarAdmin({ children , sidebar}) {

  const [user, setUser]   = useRecoilState(User)
  const [userData, setUserData] = useState({});

  const HandlingGetUserData = () => {
    const data = getSecureData();
    if (data) setUserData(data);
    else setUserData({})
  }

  useEffect(()=>{
    HandlingGetUserData()
  },[user])

  return (
    <>
      {/* Sidebar Start */}
      <div className={`sidebar pe-4 pb-3 ${sidebar ? 'open' : ''}`}>
        <nav className="navbar bg-light navbar-light">
          <NavLink to='/' className="navbar-brand mx-4 mb-3">
            <h3 className="text-primary">
              PILAR BUDAYA
            </h3>
          </NavLink>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="rounded-circle"
                src={`${process.env.PUBLIC_URL}/assets/icon/user.webp`}
                alt=""
                style={{ width: 40, height: 40 }}
              />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
            </div>
            <div className="ms-3">
              <h6 className="mb-0">{userData?.username ?? ''}</h6>
              <span>Pengguna</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <NavLink to="/dashboard" className="nav-item nav-link py-3" activeClassName='active' exact>
              <GiPieChart size={18} className="mx-2" />
              Dashboard
            </NavLink>
            <NavLink to="/akun" className="nav-item nav-link py-3" activeClassName='active' exact>
              <FaRegUser size={18} className="mx-2" />
              Akun
            </NavLink>
            <NavLink to="/iuran" className="nav-item nav-link py-3" activeClassName='active'>
              <FaWallet size={18} className="mx-2" />
              Iuran
            </NavLink>
            <NavLink to="/post" className="nav-item nav-link py-3" activeClassName='active'>
              <FaFileAlt size={18} className="mx-2" />
              Post
            </NavLink>
          </div>
        </nav>
      </div>
      {/* Sidebar End */}
    </>
  );
}

export default SidebarAdmin;