import {
  START_ACTION,
  STOP_ACTION,
  START_REFRESH_ACTION,
  STOP_REFRESH_ACTION
} from 'constants/index'

const initialUiState = {
  actionState: {
    loading: [],
    refreshing: []
  }
}

const uiReducer = (state = initialUiState, action) => {
  const { actionState } = state
  const { loading, refreshing } = actionState

  const { type, payload } = action

  switch (type) {
    case START_ACTION:
      return {
        ...state,
        actionState: {
          ...actionState,
          loading: [...loading, payload.action]
        }
      }
    case STOP_ACTION:
      return {
        ...state,
        actionState: {
          ...actionState,
          loading: loading.filter(action => action !== payload.action)
        }
      }
    case START_REFRESH_ACTION:
      return {
        ...state,
        actionState: {
          ...actionState,
          refreshing: [...refreshing, payload.action]
        }
      }
    case STOP_REFRESH_ACTION:
      return {
        ...state,
        actionState: {
          ...actionState,
          refreshing: refreshing.filter(action => action !== payload.action)
        }
      }
    default:
      return state
  }
}

export default uiReducer
