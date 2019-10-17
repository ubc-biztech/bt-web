import { combineReducers } from "redux";

const initialState = {
    events: null,
    page: 'home'
}

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        page: action.page
      }
    case "SET_EVENT":
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
