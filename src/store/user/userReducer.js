
import {
  SET_USER,
  LOGOUT
} from 'constants/index'

const initialUserState = {
  user: null
}

const userReducer = (state = initialUserState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload.user
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

export default userReducer
