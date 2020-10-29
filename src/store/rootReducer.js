import { combineReducers } from 'redux'

import eventReducer from './event/eventReducer'
import uiReducer from './ui/uiReducer'
import userReducer from './user/userReducer'

export default combineReducers({
  eventState: eventReducer,
  uiState: uiReducer,
  userState: userReducer
})
