import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { FaHome } from "react-icons/fa";
import '../../style/css/style.css';

import Notification from '../../Components/Notification';
import { loginService } from '../../Services/ServicesAPI';
import { storeSecureData, removeSecureData } from '../../Utils/Protect';
import User from '../../Store';


function Login(props) {

  const [user, setUser]           = useRecoilState(User)
  const [email, setEmail]         = useState('')
  const [katasandi, setKatasandi] = useState('')
  const [warning, setWarning]     = useState('')
  const history                   = useHistory()


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let response = await loginService(email, katasandi);
      debugger

      if (response) {
        response = {
          ...response,
          datetimeExpired: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        }
        
        storeSecureData(response);

        setUser({
          status : '',
          email : response.email,
          username : response.username,
          token : response.access_token
        })

        Notification.success('Selamat Datang', `${response.username}`);
  
        history.push('/') 
      } else {
        throw new Error("Failed to login")
      }
    } catch (err) {
      removeSecureData()

      setUser({
        status : '',
        email : '',
        username : '',
        token : '',
      })

      setWarning(err.message)
      console.log(err.message)
      Notification.warning('Upps, ', err.message);

      console.error('Error:', err.message || err);
    }
  }

  return (
    <div>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <div className="logo">
                <img src="assets/icon/logo.png" alt="Pilar Budaya Logo"/>
                <h4 className="text-uppercase mt-2" style={{color: "#9f5703"}}>Pilar Budaya</h4>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="img"  style={{ backgroundImage: `url("assets/images/gallery/Frame 2.jpg")` }}>
                </div>
                <div className="login-wrap p-4 p-md-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Masuk</h3>
                    </div>
                    <div className="w-100">
                      <p className="social-media d-flex justify-content-end">
                        <NavLink className="nav-link social-icon d-flex px-0 py-0 align-items-center justify-content-center" to="/" exact><FaHome size={20} color="#e3b04c" /></NavLink>
                      </p>
                    </div>
                  </div>
                  {
                    warning !== '' ?
                      <div className="alert alert-danger" role="alert">
                        {warning}
                      </div>
                    :
                      <></>
                  }
                  <form onSubmit={submitHandler} className="signin-form">
                    <div className="form-group mb-3">
                      <label className="label">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email" 
                        id="email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label">Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Password" 
                        value={katasandi} 
                        onChange={(e)=>setKatasandi(e.target.value)}
                        required 
                        checked
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="form-control btn btn-primary rounded submit px-3">Masuk</button>
                    </div>
                    <div className="form-group d-md-flex">
                      {/* <div className="w-50 text-md-right">
                        <a href="#">Forgot Password</a>
                      </div> */}
                    </div>
                  </form>
                  <div className="text-center">Belum Punya Akun? <NavLink className="nav-link fw-bolder" to="/register" style={{display: "contents"}} exact>Daftar</NavLink></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;