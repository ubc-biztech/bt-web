import { SET_USER, LOGOUT } from '../constants/Constants';

export function setUser(userData) {
  const user = {
    email: userData.email,
    fname: userData.fname,
    lname: userData.lname,
    name: userData.name,
    id: userData.id,
    admin: userData.admin
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
