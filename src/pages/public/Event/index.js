import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, useParams } from 'react-router-dom'

import Route from 'components/routing/Route'
import NotFound from 'pages/NotFound'

// import EventDetails from './EventDetails'
import EventRegister from './EventRegister'
import { fetchEvents } from 'store/event/eventActions'

const MemberRoutes = (props) => {
  const { user, events, eventsFetched, eventsLoading } = props

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

  const currentEvent = useMemo(
    () =>
      events &&
      eventsFetched &&
      events.find(
        (event) => event.id === eventId && event.year.toString() === eventYear
      ),
    [eventId, eventYear, events, eventsFetched]
  )

  const upcomingEvents = useMemo(
    () =>
      events &&
      eventsFetched &&
      events
        .filter((event) => {
          const currentDate = new Date()
          const eventDate = new Date(event.startDate)
          return (
            eventDate >= currentDate &&
            !(event.id === eventId && event.year.toString() === eventYear)
          )
        })
        .slice(0, 3), // Return up to the first three upcoming events
    [eventId, eventYear, events, eventsFetched]
  )

  // Loading state
  if (!eventsLoading && !currentEvent) {
    return (
      <NotFound
        message={`Could not obtain data on the event with id '${eventId}'`}
      />
    )
  }
  return (
    <Switch>
      <Route
        exact
        path='/event/:id/:year/register'
        render={() => (
          <EventRegister
            user={user}
            eventId={eventId}
            event={currentEvent}
            upcomingEvents={upcomingEvents}
            loading={eventsLoading}
          />
        )}
      />
      {/*
      MAXVP
      <Route
        exact
        path='/event/:id/:year'
        render={() => <EventDetails eventId={eventId} event={currentEvent} loading={eventsLoading} />} /> */}
      <Redirect to='/404' />
    </Switch>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.eventState.user,
    events: state.eventState.events.data,
    eventsFetched: state.eventState.events.fetched,
    eventsLoading: state.eventState.events.loading
  }
}

export default connect(mapStateToProps, {})(MemberRoutes)
