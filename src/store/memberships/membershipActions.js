import Store from "store/rootStore";
import {
  FETCH_MEMBERSHIPS_REQUEST,
  FETCH_MEMBERSHIPS_SUCCESS,
  FETCH_MEMBERSHIPS_ERROR,
} from "constants/index";
import { fetchBackend, log } from "utils";

// TODO: Handle async actions in a better way (redux-thunk)
export async function fetchMemberships(params = {}) {
  try {
    const { refresh = false } = params;
    // "request" sets the loading/refreshing states
    await Store.dispatch({ type: FETCH_MEMBERSHIPS_REQUEST, refresh });
    const response = await fetchBackend(
      "/members",
      "GET",
      undefined,
      false
    );
    const data = await response.json();
    // "success" saves the response data
    await Store.dispatch({
      type: FETCH_MEMBERSHIPS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    // "error" saves the error message
    await Store.dispatch({ type: FETCH_MEMBERSHIPS_ERROR, payload: err });
    log(err);
  }
}
