import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import User from '../../Store';


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
      <div className="container">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <div>Login Form</div>
                <div>
                  <NavLink className="btn btn-warning btn-sm" to='/'>Home</NavLink>
                </div>
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
                  <button className="btn btn-block btn-primary" type='submit'>Submit</button>
                </div>
              </form>
            </div>         
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;