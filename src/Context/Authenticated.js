import React, { useContext } from 'react';
import { AuthContext } from './Auth';

function Authenticated(props) {
  const {user, loading} = useContext(AuthContext)
  
  return (
    <>
      {
        loading ?
        'Loading . . . ' 
        :
        <span>Developed By {user.username}</span> 
      }
    </>
  );
}

export default Authenticated;