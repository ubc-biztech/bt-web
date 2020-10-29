
import {
  SET_EVENTS,
  SET_EVENTS_REGISTERED
} from 'constants/index'

const initialUiState = {
  events: null,
  eventsRegistered: null
}

const uiReducer = (state = initialUiState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.events.events
      }
    case SET_EVENTS_REGISTERED:
      return {
        ...state,
        eventsRegistered: action.eventsRegistered.eventsRegistered
      }
    default:
      return state
  }
}

export default uiReducer
