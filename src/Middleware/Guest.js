import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import User from '../Store';
import { checkTokenValidity } from '../Utils/Protect';

function Guest(props) {
  const history   = useHistory()

  if (checkTokenValidity()) {
    history.push('/')
  }

  return props.render
}

export default Guest;