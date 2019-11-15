import { combineReducers } from "redux";
import { SET_PAGE, SET_EVENT } from '../constants/Constants';

const initialState = {
  events: null,
  page: 'login'
}

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
        event: null
      }
    case SET_EVENT:
      return {
        ...state,
        page: 'event',
        event: action.event
      }
    default:
      return state;
  }
}

export default combineReducers({
  pageState: pageReducer,
});
