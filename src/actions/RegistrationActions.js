import { SET_REGISTRATIONS } from '../constants/Constants'

export function setRegistrations (registrationsData) {
  const registrations = registrationsData.data
  return {
    type: SET_REGISTRATIONS,
    registrations: registrations
  }
}

