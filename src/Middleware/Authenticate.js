import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import User from '../Store';

function Authenticate(props) {
  const {status}  = useRecoilValue(User)
  const history   = useHistory()

  if (status !== 'true') {
    history.push('/login')
  }

  return props.render
}

export default Authenticate;