import { SET_USER, LOGOUT } from '../constants/Constants';

export function setUser(userData) {
  const user = {
    email: userData.attributes.email,
    name: userData.attributes.name
  }
  return {
    type: SET_USER,
    user
  };
}

export function logout(user) {
  return {
    type: LOGOUT
  };
}
