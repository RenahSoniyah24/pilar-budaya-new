import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import '../../style/css/style.css';

import Notification from '../../Components/Notification';
import { registerService } from '../../Services/ServicesAPI';
import User from '../../Store';


function Register(props) {

  const [user, setUser]           = useRecoilState(User)
  const [fullname, setFullname]   = useState('')
  const [username, setUsername]   = useState('')
  const [email, setEmail]         = useState('')
  const [phonenumber, setPhonenumber]   = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [password, setPassword]   = useState('')
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordsMatch = password === confirmPassword;

  const [warning, setWarning]     = useState('')
  const history                   = useHistory()


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await registerService(fullname, username, email, phonenumber, birthdate, password);

      if (response.data) {
        Notification.success('Daftar Berhasil, ', "Silahkan Login");

        history.push('/login') 
      } else {
        throw new Error("Failed to login")
      }
    } catch (err) {
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
            <div className="col-md-12 col-lg-8">
              <div className="wrap d-md-flex">
                <div className="login-wrap w-100 p-4 p-md-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Daftar</h3>
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
                      <label className="label">Nama Lengkap</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nama Lengkap" 
                        id="fullname" 
                        value={fullname} 
                        onChange={(e)=>setFullname(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label">Nama Pengguna</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nama Pengguna" 
                        id="Username" 
                        value={username} 
                        onChange={(e)=>setUsername(e.target.value)}
                        required 
                      />
                    </div>
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
                      <label className="label">No Telfon</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        placeholder="No Telfon" 
                        id="fullnam" 
                        value={phonenumber} 
                        onChange={(e)=>setPhonenumber(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label">Tanggal Lahir</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        placeholder="Tanggal lahir" 
                        id="birthdate" 
                        value={birthdate} 
                        onChange={(e)=>setBirthdate(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label">Password</label>
                      <div className="input-group">
                        <input
                          type={isVisible ? 'text' : 'password'}
                          className="form-control"
                          placeholder="Password"
                          value={password} 
                          onChange={(e)=>setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary px-2"
                          onClick={() => setIsVisible(!isVisible)}
                        >
                          { isVisible ? <FaEyeSlash size={20} color="black" /> : <FaEye size={20} color="black" /> }
                        </button>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label">Confirmation Password</label>
                      <div className="input-group">
                        <input 
                          type={isVisible2 ? 'text' : 'password'}
                          className="form-control" 
                          placeholder="Confirmation Password" 
                          value={confirmPassword} 
                          onChange={(e)=>setConfirmPassword(e.target.value)}
                          required 
                          checked
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary px-2"
                          onClick={() => setIsVisible2(!isVisible2)}
                        >
                          { isVisible2 ? <FaEyeSlash size={20} color="black" /> : <FaEye size={20} color="black" /> }
                        </button>
                      </div>
                      {!passwordsMatch && confirmPassword && (
                        <small style={{ color: 'red' }}>Passwords do not match</small>
                      )}
                    </div>
                    <div className="form-group">
                      <button type="submit" className="form-control btn btn-primary rounded submit px-3">Daftar</button>
                    </div>
                    <div className="form-group d-md-flex">
                      {/* <div className="w-50 text-md-right">
                        <a href="#">Forgot Password</a>
                      </div> */}
                    </div>
                  </form>
                  <p className="text-center">Sudah Punya Akun? <NavLink className="nav-link fw-bolder" to="/login" style={{display: "contents"}} exact>Masuk</NavLink></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;