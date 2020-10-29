
import {
  SET_EVENTS,
  SET_EVENTS_REGISTERED
} from 'constants/index'

const initialEventState = {
  events: null,
  eventsRegistered: null
}

const eventReducer = (state = initialEventState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_EVENTS:
      return {
        ...state,
        events: payload.events
      }
    case SET_EVENTS_REGISTERED:
      return {
        ...state,
        eventsRegistered: payload.eventsRegistered
      }
    default:
      return state
  }
}

export default eventReducer
