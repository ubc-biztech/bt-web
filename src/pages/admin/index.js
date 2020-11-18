import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch } from 'react-router-dom'

import Route from 'components/routing/Route'
import Loading from 'pages/Loading'

import AdminHome from './Home'
import EventCreate from './Event/EventCreate'
import EventEdit from './Event/EventEdit'
import EventStats from './Event/EventStats'

import { updateEvents } from 'utils'

const AdminRoutes = (props) => {
  const {
    events,
    user
  } = props

  useEffect(() => {
    updateEvents()
  }, [])

  // Loading state
  if (!events) return <Loading message='Loading events...'/>
  // After loaded
  return user.admin ? (
    <Switch>
      <Route
        exact
        path='/admin/event/new'
        render={() => <EventCreate />} />
      <Route
        exact
        path='/admin/event/:id/edit'
        render={() => <EventEdit events={events} />} />
      <Route
        exact
        path='/admin/event/:id' // Need to make sure that this comes after 'new' and 'edit'
        render={() => <EventStats events={events} />} />
      <Route
        exact
        path='/admin/home'
        render={() => <AdminHome events={events} />} />

      <Redirect to='/404' />
    </Switch>
  ) : <Redirect to='/forbidden' />
}

const mapStateToProps = state => {
  return {
    events: state.pageState.events,
    user: state.userState.user
  }
}

export default connect(mapStateToProps, {})(AdminRoutes)
