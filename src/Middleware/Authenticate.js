import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import User from '../Store';
import { checkTokenValidity, getSecureData, removeSecureData } from '../Utils/Protect';
function Authenticate(props) {
  const history   = useHistory()
  const data      = getSecureData()

  if (!checkTokenValidity() || !data) {
    removeSecureData()
    history.push('/login')
    return 0
  }

  if(data.role !== props.role && props.role !== 'General') {
    history.push('/profile')
    return 0
  }



  return props.render
}

export default Authenticate;