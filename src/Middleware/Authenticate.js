import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import User from '../Store';
import { checkTokenValidity } from '../Utils/Protect';
function Authenticate(props) {
  const history   = useHistory()

  if (!checkTokenValidity()) {
    history.push('/login')
  }

  return props.render
}

export default Authenticate;