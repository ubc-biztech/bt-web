import React, { useEffect, useState } from 'react'
import { useParams, useHistory, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import EventUserTable from '../../components/EventUserTable'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'
import ThemeProvider from '../../components/ThemeProvider'
import { Helmet } from 'react-helmet'

function EventView (props) {
  const history = useHistory()
  const { id: eventId } = useParams()
  const { events } = props

  const [event, setEvent] = useState(null)

  // Like componentDidUpdate/DidMount
  useEffect(() => {
    if (events && eventId) {
      setEvent(events.find(event => event.id === eventId))
    }
  }, [event, events, setEvent, eventId])

  function handleEditEventClick () {
    if (eventId) history.push(`/event/${eventId}/edit`)
  }

  return event ? (
    <ThemeProvider>
      <Helmet>
        <title>{event.ename} - BizTech Admin</title>
      </Helmet>
      <Link onClick={handleEditEventClick}>Edit Event</Link>
      <Link onClick={() => { props.history.push(`/event/${event.id}/register`) }} key={event.id}>Public Event Page</Link>
      <EventUserTable event={event} />
    </ThemeProvider>
  ) : (
    <CircularProgress />
  )
}

const mapStateToProps = state => {
  return {
    events: state.pageState.events
  }
}

export default connect(mapStateToProps, { })(withRouter(EventView))
