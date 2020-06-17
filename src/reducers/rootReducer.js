import { combineReducers } from "redux";
import {
  SET_EVENTS,
  SET_USER,
  LOGOUT
} from "../constants/Constants";

const initialState = {
  page: "login"
};

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.events.events
      };
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
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

export default combineReducers({
  pageState: pageReducer,
  userState: userReducer
});
