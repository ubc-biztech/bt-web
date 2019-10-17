export function setPage(page) {
  return {
    type: 'SET_PAGE',
    page
  };
}

export function setEvent(event) {

  let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?event=' + event.id;
  window.history.pushState({path:newurl},'',newurl);

  return {
    type: 'SET_EVENT',
    event
  };
}
