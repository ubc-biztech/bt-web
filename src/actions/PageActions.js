import { SET_PAGE, SET_EVENT } from '../constants/Constants';

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

  let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?event=' + event.id;
  window.history.pushState({ path: newurl }, '', newurl);

  return {
    type: SET_EVENT,
    event
  };
}
