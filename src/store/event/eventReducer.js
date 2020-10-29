
import {
  SET_EVENTS,
  SET_EVENTS_REGISTERED
} from 'constants/index'

const initialEventState = {
  events: null,
  eventsRegistered: null
}

const eventReducer = (state = initialEventState, action) => {
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

export default eventReducer
