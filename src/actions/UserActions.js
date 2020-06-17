import { SET_USER, LOGOUT } from '../constants/Constants';

export function setUser(userData) {
  const {
    email,
    fname,
    lname,
    id,
    faculty,
    year,
    diet,
    heardFrom,
    gender,
    admin
  } = userData;
  return {
    type: SET_USER,
    user: {
      email,
      fname,
      lname,
      id,
      faculty,
      year,
      diet,
      heardFrom,
      gender,
      admin
    }
  };
}

export function logout(user) {
  return {
    type: LOGOUT
  };
}
