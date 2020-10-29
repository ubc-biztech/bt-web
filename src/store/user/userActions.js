import { SET_USER, LOGOUT } from 'constants/index'

export function setUser (userData) {
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
    admin,
    favedEventsID
  } = userData

  return {
    type: SET_USER,
    payload: {
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
        admin,
        favedEventsID
      }
    }
  }
}

export function logout () {
  return {
    type: LOGOUT
  }
}
