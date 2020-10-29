// accepts any number of arguments that are actions
export const checkIfLoading = (store, ...actionsToCheck) => {
  return store.ui.actionState.loading.some(action => actionsToCheck.includes(action))
}
export const checkIfRefreshing = (store, ...actionsToCheck) => {
  return store.ui.actionState.refreshing.some(action => actionsToCheck.includes(action))
}
export const checkIfLoadingOrRefreshing = (store, ...actionsToCheck) => {
  if (store.ui.actionState.loading.some(action => actionsToCheck.includes(action))) return true
  else return store.ui.actionState.refreshing.some(action => actionsToCheck.includes(action))
}
