import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import EventUserTable from 'components/EventUserTable'
import ThemeProvider from 'components/ThemeProvider'

import Link from '@material-ui/core/Link'

const EventStats = (props) => {
  const { events } = props

  const history = useHistory()
  const { id: eventId } = useParams()

  const [event, setEvent] = useState(null)

  // Like componentDidUpdate/DidMount
  useEffect(() => {
    if (eventId) {
      const event = events.find(event => event.id === eventId)
      setEvent(event)
    }
  }, [])

  const handleEditEventClick = () => {
    if (eventId) history.push(`/event/${eventId}/edit`)
  }

  const handleEventRegisterClick = () => {
    if (eventId) history.push(`/event/${eventId}/register`)
  }

  return (
    <ThemeProvider>
      <Helmet>
        <title>{event.ename} - BizTech Admin</title>
      </Helmet>
      <Link onClick={handleEditEventClick}>Edit Event</Link>
      <Link onClick={handleEventRegisterClick}>Public Event Page</Link>
      <EventUserTable event={event} />
    </ThemeProvider>
  )
}

export default EventStats
