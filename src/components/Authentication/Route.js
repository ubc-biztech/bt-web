import React from 'react'
import { Route } from 'react-router-dom'
import { checkFeatureFlag } from '../../utils/checkFeatureFlag'

// CustomRoute accepts "featureFlag", causes the route to not be instantiated
// The "featureFlag" flag should be used to disable certain routes related to features we don't want on production yet
const CustomRoute = ({ children, featureFlag, ...rest }) => {
  const isFeatureEnabled = checkFeatureFlag(featureFlag)
  return isFeatureEnabled ? (
    <Route {...rest}>{children}</Route>
  ) : null
}

export default CustomRoute
