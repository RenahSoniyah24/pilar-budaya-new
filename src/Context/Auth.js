import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext()

const Auth  = ({children}) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser]       = useState([])

  const getUser = async () => {
    try {
      setLoading(true)
      let response = await axios.get('https://jsonplaceholder.typicode.com/users/1')
      setUser(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.log(error.message)
    }
  }

  useEffect(()=>{
    getUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthContext, Auth};