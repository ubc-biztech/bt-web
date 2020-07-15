import { combineReducers } from 'redux'
import {
  SET_EVENTS,
  SET_USER,
  SET_REGISTRATIONS,
  LOGOUT
} from '../constants/Constants'

const initialPageState = {
  page: 'login'
}

function pageReducer (state = initialPageState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.events.events
      }
    default:
      return state
  }
}

function userReducer (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
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

function registrationsReducer (state = {}, action) {
  switch (action.type) {
    case SET_REGISTRATIONS:
      return {
        ...state,
        registrations: action.registrations
      }
    default:
      return state
  }
}

export default combineReducers({
  pageState: pageReducer,
  userState: userReducer,
  registrationsState: registrationsReducer
})
