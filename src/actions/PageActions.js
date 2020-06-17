import { SET_EVENTS } from '../constants/Constants';

export function setEvents(events) {
  return {
    type: SET_EVENTS,
    events
  };
}
