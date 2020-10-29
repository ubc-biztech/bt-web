import { combineReducers } from 'redux'

import eventReducer from './event/eventReducer'
import userReducer from './user/userReducer'

export default combineReducers({
  eventState: eventReducer,
  userState: userReducer
})
