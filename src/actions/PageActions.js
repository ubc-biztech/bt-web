import { SET_EVENT, SET_EVENTS, SET_EVENT_TABLE_USER_DATA } from '../constants/Constants';

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

export function setEventTableUserData(userData) {
  return {
    type: SET_EVENT_TABLE_USER_DATA,
    userData
  };
}
