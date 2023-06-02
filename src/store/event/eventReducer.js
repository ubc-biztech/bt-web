import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
} from "constants/index";

const initialEventState = {
  events: {
    data: [],
    fetched: false,
    loading: false,
    refreshing: false,
    error: "",
    lastUpdated: null,
  },
};

const eventReducer = (state = initialEventState, action) => {
  const {
    type, payload, refresh = false
  } = action;

  switch (type) {
  // fetch events
  case FETCH_EVENTS_REQUEST:
    return {
      ...state,
      events: {
        ...state.events,
        loading: !refresh,
        refreshing: refresh,
      },
    };
  case FETCH_EVENTS_SUCCESS:
    return {
      ...state,
      events: {
        ...state.events,
        fetched: true,
        loading: false,
        refreshing: false,
        data: payload,
        lastUpdated: new Date(),
      },
    };
  case FETCH_EVENTS_ERROR:
    return {
      ...state,
      events: {
        ...state.events,
        fetched: true,
        loading: false,
        refreshing: false,
        error: payload,
        lastUpdated: new Date(),
      },
    };
  default:
    return state;
  }
};

export default eventReducer;
