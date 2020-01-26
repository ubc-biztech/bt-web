import { combineReducers } from "redux";
import { SET_EVENT, SET_EVENTS, SET_USER, LOGOUT } from '../constants/Constants';

const initialState = {
  page: 'login',
  eventUserList: [
    {
      name: "Ian Mah",
      studentNumber: 159,
      email: "1@gmail.com",
      checkedIn: true
    },
    {
      name: "Derek Chen",
      studentNumber: 152,
      email: "2@gmail.com",
      checkedIn: false
    },
    {
      name: "Jacques Chen",
      studentNumber: 512,
      email: "3@gmail.com",
      checkedIn: false
    },
    {
      name: "Cris Mihailescu",
      studentNumber: 214,
      email: "4@gmail.com",
      checkedIn: false
    },
    {
      name: "Adin Kwok",
      studentNumber: 859,
      email: "5@gmail.com",
      checkedIn: false
    },
    {
      name: "Andy Luu",
      studentNumber: 104,
      email: "6@gmail.com",
      checkedIn: false
    }
  ]
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
    default:
      return state;
  }
}

export default combineReducers({
  pageState: pageReducer,
  userState: userReducer
});
