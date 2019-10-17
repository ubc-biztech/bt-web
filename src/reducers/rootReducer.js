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
    default:
      return state;
  }
}

export default combineReducers({
  pageState: pageReducer,
});
