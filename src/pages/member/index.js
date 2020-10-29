import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch } from 'react-router-dom'

import Route from 'components/routing/Route'

import MemberCreate from './MemberCreate'
import MemberProfile from './MemberProfile'
import MemberHome from './Home'

const MemberRoutes = (props) => {
  const {
    user
  } = props

  return (
    <Switch>
      <Route
        exact
        path='/member/profile'
        featureFlag={'REACT_APP_SHOW_MAXVP'}
        render={() => <MemberProfile />} />
      <Route
        exact
        path='/member/create'
        featureFlag={'REACT_APP_SHOW_MAXVP'}
        render={() => user.id
          ? <Redirect to='/member/home' /> /* Allow create member only if user is not yet registered in DB */
          : <MemberCreate />} />
      <Route
        exact
        path='/member/home'
        featureFlag={'REACT_APP_SHOW_MAXVP'}
        render={() => <MemberHome user={user} />} />

      <Redirect to='/404' />
    </Switch>
  )
}

const mapStateToProps = state => {
  return {
    events: state.pageState.events,
    user: state.userState.user,
    registrations: state.pageState.eventsRegistered
  }
}

export default connect(mapStateToProps, {})(MemberRoutes)
