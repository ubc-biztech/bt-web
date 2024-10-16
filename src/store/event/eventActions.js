import Store from "store/rootStore";
import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
} from "constants/index";
import {
  fetchBackend, log
} from "utils";

// TODO: Handle async actions in a better way (redux-thunk)
export async function fetchEvents(params = {
}) {
  try {
    const {
      refresh = false
    } = params;
    // "request" sets the loading/refreshing states
    await Store.dispatch({
      type: FETCH_EVENTS_REQUEST,
      refresh
    });
    const response = await fetchBackend("/events", "GET", undefined, false);
    // "success" saves the response data
    await Store.dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: response
    });
  } catch (err) {
    // "error" saves the error message
    await Store.dispatch({
      type: FETCH_EVENTS_ERROR,
      payload: err
    });
    log(err);
  }
}

export async function deleteEvent(params = {
}) {
  try {
    const {
      eventId, eventYear
    } = params;
    if (!eventId) return;
    // do the delete
    const response = await fetchBackend(
      `/events/${eventId}/${eventYear}`,
      "DELETE"
    );
    // update events state after
    await fetchEvents({
      refresh: true
    });
    // display the response
    alert(response.message);
  } catch (err) {
    alert(err.message + " Please contact a dev");
    log(err);
  }
}
