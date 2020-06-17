import aws_config from '../aws-config'
import Store from '../components/Store'
import { setEvents } from '../actions/PageActions'
import { setUser } from '../actions/UserActions'

// TODO: Configure travis to build a staging version
// export const AWS_CONFIG = process.env.REACT_APP_STAGE === 'production'
//     ? aws_config
//     : aws_exports

export const AWS_CONFIG = aws_config

const API_URL = process.env.REACT_APP_STAGE === 'production'
  ? process.env.REACT_APP_PROD_API
  : process.env.REACT_APP_STAGING_API

const API_KEY = process.env.REACT_APP_STAGE === 'production'
  ? process.env.REACT_APP_PROD_API_KEY
  : process.env.REACT_APP_STAGING_API_KEY

export function fetchBackend (endpoint, method, data) {
  let headers
  if (method === 'POST') {
    headers = {
      'x-api-key': API_KEY,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  } else {
    headers = {
      'x-api-key': API_KEY
    }
  }
  const body = JSON.stringify(data)
  let status
  return fetch(API_URL + endpoint, { method, headers, body })
    .then(response => {
      status = response.status
      return response.json()
    })
    .then(response => {
      // Actually throw an error (so catch block will run) when the response is an error
      if (status < 200 || status >= 300) {
        return Promise.reject({
          status: status,
          message: response
        })
      }
      return Promise.resolve(response)
    })
}

export function log (message) {
  if (process.env.REACT_APP_STAGE !== 'production') {
    console.log(message)
  }
}

// Refresh the redux store
export async function updateEvents () {
  try {
    const response = await fetchBackend('/events', 'GET')
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
