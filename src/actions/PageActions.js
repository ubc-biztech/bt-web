import { SET_PAGE, SET_EVENT, SET_EVENTS } from '../constants/Constants';

export function setPage(page) {
  return {
    type: SET_PAGE,
    page
  };
}

export function setEvent(event) {
  if (!event.id) {
    return {
      type: SET_PAGE,
      page: 'home'
    };
  }
  else return {
    type: SET_EVENT,
    event
  };
}

export function setEvents(events) {
  return {
    type: SET_EVENTS,
    events
  };
}
