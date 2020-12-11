import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Link } from '@material-ui/core'

import NotFound from 'pages/NotFound'
import EventStatsTable from './EventStatsTable'
import EventStatsSkeleton from './skeleton'

const EventStats = (props) => {
  const { events } = props

  const history = useHistory()
  const { id: eventId, year: eventYear } = useParams()

  const [event, setEvent] = useState(null)
  const [loaded, setLoaded] = useState(false)

  // Like componentDidUpdate/DidMount
  useEffect(() => {
    if (eventId) {
      const event = events.find(event => event.id === eventId && event.year.toString() === eventYear)
      setEvent(event)
      setLoaded(true)
    }
  }, [eventId, eventYear, events])

  const handleEditEventClick = () => {
    if (eventId) history.push(`/admin/event/${eventId}/${eventYear}/edit`)
  }

  const handleEventRegisterClick = () => {
    if (eventId) history.push(`/admin/event/${eventId}/${eventYear}/register`)
  }

  if (!loaded) return <EventStatsSkeleton />
  return event ? (
    <>
      <Helmet>
        <title>{event.ename} - BizTech Admin</title>
      </Helmet>
      <Link onClick={handleEditEventClick}>Edit Event</Link>
      <Link onClick={handleEventRegisterClick}>Public Event Page</Link>
      <EventStatsTable event={event} />
    </>
  ) : <NotFound message={`The event with id ${eventId} and year ${eventYear} could not be found`}/>
} 

export default EventStats
