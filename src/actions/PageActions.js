import { SET_EVENT, SET_EVENTS } from '../constants/Constants';

export function setEvent(event) {
  if (event.id) {
    return {
      type: SET_EVENT,
      event
    };
  } else {
    return {
      type: SET_EVENT,
      event: null
    };
  }
}

export function setEvents(events) {
  return {
    type: SET_EVENTS,
    events
  };
}
