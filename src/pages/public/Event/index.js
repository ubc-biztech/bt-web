import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, useParams } from 'react-router-dom'

import Route from 'components/routing/Route'
import NotFound from 'pages/NotFound'
import Header from '../../../components/layout/Header'	
import Footer from '../../../components/layout/Footer'

import EventDetails from './EventDetails'
import EventRegister from './EventRegister'
import { fetchEvents } from 'store/event/eventActions'

const MemberRoutes = (props) => {
  const {
    events,
    eventsFetched,
    eventsLoading
  } = props

  const { id: eventId, year: eventYear } = useParams()

  useEffect(() => {
    // extra check if eventId not provided
    if (!eventId || !events) return

    // try to find the event in redux first
    if (!eventsFetched) {
      // if event data was not fetched yet, fetch the current event
      fetchEvents()
    }
  }, [events, eventId, eventsFetched])

  const currentEvent = useMemo(() => (
    events && eventsFetched && events.find(event => event.id === eventId && event.year.toString() === eventYear)
  ), [eventId, eventYear, events, eventsFetched])

  // Loading state
  if (!eventsLoading && !currentEvent) return <NotFound message={`Could not obtain data on the event with id '${eventId}'`}/>
  return (
    <div>
      <Header/>
      <Switch>
        

        <Route
          exact
          path='/event/:id/:year/register'
          render={() => <EventRegister eventId={eventId} event={currentEvent} loading={eventsLoading} />} />
        <Route
          exact
          path='/event/:id/:year'
          render={() => <EventDetails eventId={eventId} event={currentEvent} loading={eventsLoading} />} />
        <Redirect to='/404' />
      </Switch>
      <Footer/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    events: state.eventState.events.data,
    eventsFetched: state.eventState.events.fetched,
    eventsLoading: state.eventState.events.loading
  }
}

export default connect(mapStateToProps, {})(MemberRoutes)
