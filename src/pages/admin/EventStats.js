import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'
import EventUserTable from '../../components/EventUserTable'
import ThemeProvider from '../../components/ThemeProvider'
import { updateEvents } from '../../utils'

function EventStats (props) {
  const history = useHistory()
  const { id: eventId } = useParams()
  const { events } = props
  if (!events) {
    updateEvents()
  }

  const [event, setEvent] = useState(null)

  // Like componentDidUpdate/DidMount
  useEffect(() => {
    if (events && eventId) {
      setEvent(events.find(event => event.id === eventId))
    }
  }, [event, events, setEvent, eventId])

  const handleEditEventClick = () => {
    if (eventId) history.push(`/event/${eventId}/edit`)
  }

  const handleEventRegisterClick = () => {
    if (eventId) history.push(`/event/${eventId}/register`)
  }

  return event ? (
    <ThemeProvider>
      <Helmet>
        <title>{event.ename} - BizTech Admin</title>
      </Helmet>
      <Link onClick={handleEditEventClick}>Edit Event</Link>
      <Link onClick={handleEventRegisterClick}>Public Event Page</Link>
      <EventUserTable event={event} />
    </ThemeProvider>
  ) : (
    <CircularProgress />
  )
}

export default EventStats
