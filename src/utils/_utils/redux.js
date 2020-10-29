import Store from 'store/rootStore'

import { setEvents, setEventsRegistered } from 'store/events/EventActions'
import { setUser } from 'store/user/UserActions'
import { fetchBackend } from './fetchBackend'
import { log } from './log'

// Refresh the redux store
export async function updateEvents () {
  try {
    const response = await fetchBackend('/events', 'GET', undefined, false)
    Store.dispatch(setEvents({
      events: response
    }))
  } catch (err) {
    log(err)
  }
}

// Refresh the redux store
export async function updateUser (id) {
  try {
    const response = await fetchBackend(`/users/${id}`, 'GET')
    Store.dispatch(setUser(response))
  } catch (err) {
    log(err)
  }
}

// Refresh the redux store
export async function updateRegisteredEvents (userId) {
  try {
    const response = await fetchBackend(`/registrations?id=${userId}`, 'GET')

    let data = []

    // TODO: Better API response? Shouldn't return 404 if empty
    if (response.status !== 404) {
      data = response.data
    }

    Store.dispatch(setEventsRegistered({
      eventsRegistered: Object.values(data)
    }))
  } catch (err) {
    log(err)
  }
}
