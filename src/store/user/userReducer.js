import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_REGISTERED_EVENTS_REQUEST,
  FETCH_USER_REGISTERED_EVENTS_SUCCESS,
  FETCH_USER_REGISTERED_EVENTS_ERROR,
  SET_USER,
  LOGOUT,
} from "constants/index";

const initialUserState = {
  user: {
    data: null,
    fetched: false,
    loading: false,
    refreshing: false,
    error: "",
    lastUpdated: null,
  },
  userRegisteredEvents: {
    data: null,
    fetched: false,
    loading: false,
    refreshing: false,
    error: "",
    lastUpdated: null,
  },
};

const userReducer = (state = initialUserState, action) => {
  const { type, payload, refresh = false } = action;

  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          data: payload,
          loading: !refresh,
          refreshing: refresh,
        },
      };
    case FETCH_USER_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          data: payload,
          loading: !refresh,
          refreshing: refresh,
        },
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          data: payload,
          fetched: true,
          loading: false,
          refreshing: false,
          lastUpdated: new Date(),
        },
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          data: payload,
          fetched: true,
          loading: false,
          refreshing: false,
          lastUpdated: new Date(),
        },
      };
    case FETCH_USER_REGISTERED_EVENTS_REQUEST:
      return {
        ...state,
        userRegisteredEvents: {
          ...state.userRegisteredEvents,
          data: payload,
          loading: !refresh,
          refreshing: refresh,
        },
      };
    case FETCH_USER_REGISTERED_EVENTS_SUCCESS:
      return {
        ...state,
        userRegisteredEvents: {
          ...state.userRegisteredEvents,
          data: payload,
          fetched: true,
          loading: false,
          refreshing: false,
          lastUpdated: new Date(),
        },
      };
    case FETCH_USER_REGISTERED_EVENTS_ERROR:
      return {
        ...state,
        userRegisteredEvents: {
          ...state.userRegisteredEvents,
          data: payload,
          fetched: true,
          loading: false,
          refreshing: false,
          lastUpdated: new Date(),
        },
      };
    case LOGOUT:
      return {
        ...state,
        user: {
          ...state.user,
          data: null,
          fetched: false,
          loading: false,
          refreshing: false,
          lastUpdated: new Date(),
        },
        userRegisteredEvents: {
          ...state.userRegisteredEvents,
          data: null,
          fetched: false,
          loading: false,
          refreshing: false,
          error: "",
          lastUpdated: null,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
