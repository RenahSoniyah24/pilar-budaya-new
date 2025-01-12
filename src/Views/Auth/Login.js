import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import User from '../../Store';
import { FaHome } from "react-icons/fa";
import '../../style/css/style.css';


function Login(props) {

  const [user, setUser]           = useRecoilState(User)
  const [username, setUsername]   = useState('')
  const [katasandi, setKatasandi] = useState('')
  const [warning, setWarning]     = useState('')
  const history                   = useHistory()


  const submitHandler = (e) => {
    e.preventDefault();

    if (katasandi === 'Password123') {
      localStorage.setItem('status', true)
      localStorage.setItem('nama', username)

      setUser({
        status : localStorage.getItem('status'),
        name : localStorage.getItem('nama')
      })

      history.push('/')
    }else{
      localStorage.setItem('status', false)
      localStorage.setItem('nama', '')

      setUser({
        status : localStorage.getItem('status'),
        name : localStorage.getItem('nama')
      })

      setWarning('Katasandi Salah')
      console.log('katasandi salah')
    }

    console.log(user)
  }

  return (
    <div>
      {/* <div className="container">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="card">
            <div className="card-header">
              <div className="logo">
                <img src="assets/icon/logo.png" alt="Pilar Budaya Logo"/>
                <h4 className="text-uppercase mt-2 text-white">Pilar Budaya</h4>
              </div>
            </div>
            <div className="card-body">
              {
                warning !== '' ?
                  <div className="alert alert-danger" role="alert">
                    {warning}
                  </div>
                :
                  <></>
              }
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="">Username</label>
                  <input type="text" name="username" id="username" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>

                <div className="mb-3">
                  <label htmlFor="">Password</label>
                  <input type="password" name="password" id="password" className="form-control" value={katasandi} onChange={(e)=>setKatasandi(e.target.value)}/>
                </div>
                <div className="gap-2 d-grid">
                  <button className="btn btn-block btn-primary" type='submit'>Masuk</button>
                </div>
              </form>
            </div>         
          </div>
        </div>
      </div> */}

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
                  <form action="#" className="signin-form">
                    <div className="form-group mb-3">
                      <label className="label" for="name">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email" 
                        id="email" 
                        required 
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" for="password">Password</label>
                      <input type="password" className="form-control" placeholder="Password" required />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50 text-left">
                        <label className="checkbox-wrap checkbox-primary mb-0">Remember Me
                        <input type="checkbox" checked/>
                        <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="w-50 text-md-right">
                        <a href="#">Forgot Password</a>
                      </div>
                    </div>
                  </form>
                  <p className="text-center">Not a member? <a data-toggle="tab" href="#signup">Sign Up</a></p>
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