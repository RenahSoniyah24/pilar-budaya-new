import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import User from '../Store';

function Guest(props) {
  const {status}  = useRecoilValue(User)
  const history   = useHistory()

  if (status === true) {
    history.push('/')
  }

  return props.render
}

export default Guest;