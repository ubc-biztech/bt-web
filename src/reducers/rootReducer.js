import { combineReducers } from "redux";
import { SET_EVENT, SET_EVENTS, SET_USER, LOGOUT, SET_EVENT_TABLE_USER_DATA } from '../constants/Constants';

const initialState = {
  page: 'login',
}

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENT:
      return {
        ...state,
        page: 'event',
        event: action.event
      }
    case SET_EVENTS:
      return {
        ...state,
        events: action.events.events
      }
    default:
      return state;
  }
}

function userReducer(state = initialState, action) {
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
    case SET_EVENT_TABLE_USER_DATA:
      console.log(action.userData)
      return {
        ...state,
        eventTableUserData: action.userData
      }
    default:
      return state;
  }
}

// function eventTableReducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_EVENT_TABLE_USER_DATA:
//       console.log(action.userData)
//       return {
//         ...state,
//         eventTableUserData: action.userData
//       }
//     default:
//       return state;
//   }
// }

export default combineReducers({
  pageState: pageReducer,
  userState: userReducer,
  // eventTableState: eventTableReducer,
});
