import { Auth } from 'aws-amplify'
import { API_URL } from 'constants/index'

export async function fetchBackend (endpoint, method, data, authenticatedCall = true) {
  let headers = {}
  if (method === 'POST') {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (authenticatedCall) {
    headers.Authorization = `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
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
        // eslint-disable-next-line
        return Promise.reject({
          status: status,
          message: response
        })
      }
      return Promise.resolve(response)
    })
}