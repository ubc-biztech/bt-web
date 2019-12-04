import { SET_EVENT, SET_EVENTS } from '../constants/Constants';

export function setEvent(event) {
  if (event.id) {
    return {
      type: SET_EVENT,
      event
    };
  }
}

export function setEvents(events) {
  return {
    type: SET_EVENTS,
    events
  };
}
