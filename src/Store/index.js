import { atom } from 'recoil';

const User = atom({
  key : 'User',
  default : {
    status : localStorage.getItem('status'),
    name : localStorage.getItem('nama')
  }
})

export default User