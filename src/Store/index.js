import { atom } from 'recoil';

const User = atom({
  key : 'User',
  default : {
    status : localStorage.getItem('status'),
    email : localStorage.getItem('email'),
    username : localStorage.getItem('username'),
    token : localStorage.getItem('token')
  }
})

export default User