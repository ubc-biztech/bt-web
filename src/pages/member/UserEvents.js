/* eslint react-hooks/exhaustive-deps: 0 */
import React, { useState, useMemo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import EventCard from '../../components/Cards/Event'
import { fetchBackend, updateEvents, updateRegisteredEvents } from '../../utils'

import { setUser } from '../../actions/UserActions'

import { COLOR } from '../../constants/Constants'
import { withStyles } from '@material-ui/core/styles'
import {
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'

import {
  StarBorder,
  PlaylistAddCheck,
  Search
} from '@material-ui/icons'

// States for the filters
const PANEL_STATES = {
  FAVORITES: 'FAVORITES',
  REGISTERED: 'REGISTERED',
  ALL: 'ALL'
}

const TAB_STATES = {
  UPCOMING: 0,
  PAST: 1,
  ALL: 2
}

const styles = ({
  header: {
    color: COLOR.BIZTECH_GREEN
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '14px',
    paddingBottom: '14px'
  },
  sidePanel: {
    layout: {
      display: 'flex',
      float: 'right',
      flexDirection: 'column',
      textAlign: 'right',
      marginRight: '3em',
      minWidth: '15em'
    },
    title: {
      fontSize: '3em'
    },
    button: {
      textAlign: 'right'
    },
    activeButton: {
      textAlign: 'right',
      borderRight: `2px solid ${COLOR.BIZTECH_GREEN}`
    }
  },
  tabs: {
    container: {
      width: '100%'
    },
    layout: {
      marginBottom: '2em'
    },
    tab: {
      fontSize: '0.9rem',
      marginLeft: '1em',
      marginRight: '1em',
      textTransform: 'none',
      maxWidth: '5em',
      width: '100%',
      color: COLOR.WHITE
    }
  },
  rows: {
    display: 'flex',
    flexWrap: 'wrap'
  }
})

function EventPanel (props) {
  const { children, currentIndex, index, ...rest } = props

  return (
    <div
      role='tabpanel'
      hidden={currentIndex !== index}
      id={`tabpanel-${index}`}
      { ...rest }
    >
      {children}
    </div>
  )
}

function UserEvents (props) {
  const [tabIndex, setTabIndex] = useState(TAB_STATES.ALL)
  const [selectedPanel, setSelectedPanel] = useState(PANEL_STATES.ALL)

  const history = useHistory()

  const { events = [], eventsRegistered = [], user } = props

  useEffect(() => {
    if (!props.events) updateEvents()
    if (user.id) updateRegisteredEvents(user.id)
  }, [])

  const handleFavoriteEvent = async (eventId, toggle) => {
    const body = { eventID: eventId, isFavourite: toggle }
    await fetchBackend(`/users/favEvent/${user.id}`, 'PATCH', body)
    const newEventsId = toggle
      ? [...user.favedEventsID, eventId]
      : user.favedEventsID.filter((id) => id !== eventId)
    props.setUser({
      ...user,
      favedEventsID: newEventsId
    })
  }

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex)
  }

  const handlePanelChange = (newIndex) => {
    setSelectedPanel(newIndex)
  }

  const redirectToEvent = (e, eventId) => {
    history.push(`/event/${eventId}/register`)
  }

  const eventsRegisteredIds = useMemo(() => {
    if (eventsRegistered.length && typeof eventsRegistered[0] === 'object') {
      return eventsRegistered.map((event) => event.eventID)
    }

    return eventsRegistered
  }, [eventsRegistered])

  const eventsFavoritedIds = useMemo(() => {
    if (user && user.favedEventsID && user.favedEventsID.length) {
      return user.favedEventsID
    }

    return []
  }, [user.favedEventsID])

  const AllEventCards = useMemo(() => {
    if (selectedPanel === PANEL_STATES.REGISTERED) return events.filter((event) => eventsRegisteredIds.includes(event.id))
    else if (selectedPanel === PANEL_STATES.FAVORITES) return events.filter((event) => eventsFavoritedIds.includes(event.id))
    else return events
  }, [events, selectedPanel, user.favedEventsID])

  const UpcomingEventCards = useMemo(() => {
    // filter events by the date
    const now = new Date()
    return AllEventCards.filter((event) => event.startDate && new Date(event.startDate) >= now)
  }, [AllEventCards, selectedPanel])

  const PastEventCards = useMemo(() => {
    // filter events by the date
    const now = new Date()
    return AllEventCards.filter((event) => event.startDate && new Date(event.startDate) < now)
  }, [AllEventCards, selectedPanel])

  return (
    <div>
      <Helmet>
        <title>Biztech User Events Dashboard</title>
      </Helmet>
      <div style={styles.flex}>
        <div style={styles.sidePanel.layout}>
          <Typography variant='h1' style={styles.header}>Events</Typography>
          <List>
            <ListItem
              style={selectedPanel === PANEL_STATES.FAVORITES
                ? styles.sidePanel.activeButton
                : styles.sidePanel.button}
              onClick={() => handlePanelChange(PANEL_STATES.FAVORITES)}
              button
            >
              <ListItemText><StarBorder fontSize='small' />&nbsp;Favorites</ListItemText>
            </ListItem>
            <ListItem
              style={selectedPanel === PANEL_STATES.REGISTERED
                ? styles.sidePanel.activeButton
                : styles.sidePanel.button}
              onClick={() => handlePanelChange(PANEL_STATES.REGISTERED)}
              button
            >
              <ListItemText><PlaylistAddCheck fontSize='small' />&nbsp;Registered</ListItemText>
            </ListItem>
            <ListItem
              style={selectedPanel === PANEL_STATES.ALL
                ? styles.sidePanel.activeButton
                : styles.sidePanel.button}
              onClick={() => handlePanelChange(PANEL_STATES.ALL)}
              button
            >
              <ListItemText><Search fontSize='small' />&nbsp;All</ListItemText>
            </ListItem>
          </List>
        </div>
        <div style={styles.tabs.container}>

          <Tabs
            value={tabIndex}
            indicatorColor='primary'
            textColor='primary' // TODO: Set the primary color theme
            onChange={handleTabChange}
            style={styles.tabs.layout}
          >
            <Tab label='Upcoming' style={styles.tabs.tab} />
            <Tab label='Past' style={styles.tabs.tab} />
            <Tab label='All' style={styles.tabs.tab} />
          </Tabs>

          <EventPanel currentIndex={tabIndex} index={TAB_STATES.UPCOMING}>
            <div style={styles.rows}>
              {UpcomingEventCards.map((event) => (
                <EventCard
                  event={event}
                  key={event.id}
                  variant='user'
                  favorited={eventsFavoritedIds.includes(event.id)}
                  handleCardClick={redirectToEvent}
                  handleFavorite={handleFavoriteEvent}
                  cardStyle={{ width: '40%' }}
                />
              ))}
            </div>
          </EventPanel>
          <EventPanel currentIndex={tabIndex} index={TAB_STATES.PAST}>
            <div style={styles.rows}>
              {PastEventCards.map((event) => (
                <EventCard
                  event={event}
                  key={event.id}
                  variant='user'
                  favorited={eventsFavoritedIds.includes(event.id)}
                  handleCardClick={redirectToEvent}
                  handleFavorite={handleFavoriteEvent}
                  cardStyle={{ width: '40%' }}
                />
              ))}
            </div>
          </EventPanel>
          <EventPanel currentIndex={tabIndex} index={TAB_STATES.ALL}>
            <div style={styles.rows}>
              {AllEventCards.map((event) => (
                <EventCard
                  event={event}
                  key={event.id}
                  variant='user'
                  favorited={eventsFavoritedIds.includes(event.id)}
                  handleCardClick={redirectToEvent}
                  handleFavorite={handleFavoriteEvent}
                  cardStyle={{ width: '40%' }}
                />
              ))}
            </div>
          </EventPanel>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    events: state.pageState.events,
    eventsRegistered: state.pageState.eventsRegistered,
    user: state.userState.user
  }
}

export default connect(mapStateToProps, { setUser })(withStyles(styles)(UserEvents))
