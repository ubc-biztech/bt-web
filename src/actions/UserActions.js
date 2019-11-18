import { SET_USER } from '../constants/Constants';

export function setUser(user) {
  return {
    type: SET_USER,
    user
  };
}
