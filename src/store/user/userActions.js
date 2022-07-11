import Store from 'store/rootStore'

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_REGISTERED_EVENTS_REQUEST,
  FETCH_USER_REGISTERED_EVENTS_SUCCESS,
  FETCH_USER_REGISTERED_EVENTS_ERROR,
  SET_USER,
  LOGOUT
} from 'constants/index'
import { fetchBackend, log } from 'utils'

// ACTION CREATORS
export function setUser (userData) {
  const {
    email,
    fname,
    lname,
    education,
    id,
    faculty,
    year,
    diet,
    major,
    heardFrom,
    gender,
    admin,
    favedEventsID
  } = userData

  return {
    type: SET_USER,
    payload: {
      email,
      fname,
      lname,
      education,
      id,
      faculty,
      major,
      year,
      diet,
      heardFrom,
      gender,
      admin,
      favedEventsID
    }
  }
}

export function logout () {
  return {
    type: LOGOUT
  }
}

// ACTIONS
export async function fetchUser (params = {}) {
  try {
    const { userId, refresh = false } = params
    await Store.dispatch({ type: FETCH_USER_REQUEST, refresh })
    const response = await fetchBackend(`/users/${userId}`, 'GET')
    const payload = {
      email: response.id,
      fname: response.fname,
      lname: response.lname,
      education: response.education,
      id: response.studentId,
      faculty: response.faculty,
      major: response.major,
      year: response.year,
      diet: response.diet,
      heardFrom: response.heardFrom,
      gender: response.gender,
      admin: response.admin,
      favedEventsID: response.favedEventsID
    }
    await Store.dispatch({ type: FETCH_USER_SUCCESS, payload })
  } catch (err) {
    await Store.dispatch({ type: FETCH_USER_ERROR, payload: err })
    log(err)
  }
}

export async function fetchUserRegisteredEvents (params = {}) {
  try {
    const { userId, refresh = false } = params
    await Store.dispatch({
      type: FETCH_USER_REGISTERED_EVENTS_REQUEST,
      refresh
    })
    const response = await fetchBackend(`/registrations?email=${userId}`, 'GET')
    await Store.dispatch({
      type: FETCH_USER_REGISTERED_EVENTS_SUCCESS,
      payload: response
    })
  } catch (err) {
    await Store.dispatch({
      type: FETCH_USER_REGISTERED_EVENTS_ERROR,
      payload: err
    })
    log(err)
  }
}
