import {
  START_ACTION,
  STOP_ACTION,
  START_REFRESH_ACTION,
  STOP_REFRESH_ACTION
} from 'constants/index'

export function startAction (action = '') {
  return {
    type: START_ACTION,
    payload: { action }
  }
}
export function stopAction (action = '') {
  return {
    type: STOP_ACTION,
    payload: { action }
  }
}

export function startRefreshAction (action = '') {
  return {
    type: START_REFRESH_ACTION,
    payload: { action }
  }
}
export function stopRefreshAction (action = '') {
  return {
    type: STOP_REFRESH_ACTION,
    payload: { action }
  }
}
