/* eslint react-hooks/exhaustive-deps: 0 */
import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import EventCard from '../../components/Cards/Event'
import { fetchBackend, updateEvents, updateRegisteredEvents } from '../../utils'

import { setUser } from '../../actions/UserActions'

import { COLOR } from '../../constants/Constants'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  InputBase
} from '@material-ui/core'

import {
  StarBorder,
  PlaylistAddCheck,
  Search
} from '@material-ui/icons'

// States for the filters
const PANEL_STATES = {
  FAVOURITES: 'FAVOURITES',
  REGISTERED: 'REGISTERED',
  ALL: 'ALL'
}

const TAB_STATES = {
  UPCOMING: 0,
  PAST: 1,
  ALL: 2
}

const useStyles = makeStyles(theme => ({
  header: {
    color: COLOR.BIZTECH_GREEN
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '14px',
    paddingBottom: '14px'
  },
  sidePanelLayout: {
    display: 'flex',
    float: 'right',
    flexDirection: 'column',
    textAlign: 'right',
    marginRight: '3em'
  },
  sidePanelTitle: {
    fontSize: '3em'
  },
  sidePanelButton: {
    textAlign: 'right',
    whiteSpace: 'nowrap'
  },
  sidePanelActiveButton: {
    textAlign: 'right',
    whiteSpace: 'nowrap',
    borderRight: `2px solid ${COLOR.BIZTECH_GREEN}`
  },
  tabsLayout: {
    width: '80%',
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      margin: 'unset'
    }
  },
  tabsContainer: {
    marginBottom: '2em',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.up('sm')]: {
      marginRight: '30px'
    }
  },
  tab: {
    fontSize: '0.9rem',
    marginLeft: '1em',
    marginRight: '1em',
    textTransform: 'none',
    maxWidth: '5em',
    width: '100%',
    color: `${COLOR.WHITE} !important`
  },
  search: {
    display: 'flex',
    height: '100%',
    maxWidth: '100%',
    background: 'white',
    borderRadius: '3em',
    marginLeft: 'auto'
  },
  searchIcon: {
    display: 'flex',
    background: 'white',
    borderRadius: '50%',
    padding: '0.5em',
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none'
    }
  },
  searchInput: {
    width: '0',
    color: COLOR.CARD_PAPER_COLOR,
    transition: theme.transitions.create('width')
  },
  searchInputActive: {
    width: '70vw',
    color: COLOR.CARD_PAPER_COLOR,
    transition: theme.transitions.create('width')
  },
  rows: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}))

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
  const [isSearch, setIsSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [tabIndex, setTabIndex] = useState(TAB_STATES.ALL)
  const [selectedPanel, setSelectedPanel] = useState(PANEL_STATES.ALL)

  const history = useHistory()
  const classes = useStyles()
  const searchInput = useRef()

  const theme = useTheme()
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))

  const { events = [], eventsRegistered = [], user } = props

  useEffect(() => {
    if (!props.events) updateEvents()
    if (user.id) updateRegisteredEvents(user.id)
  }, [])

  const handleFavouriteEvent = async (eventId, toggle) => {
    const body = { eventID: eventId, isFavourite: toggle }
    await fetchBackend(`/users/favEvent/${user.id}`, 'PATCH', body)
    const newEventIds = toggle
      ? [...user.favedEventsID, eventId]
      : user.favedEventsID.filter((id) => id !== eventId)
    props.setUser({
      ...user,
      favedEventsID: newEventIds
    })
  }

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex)
  }

  const handlePanelChange = (newIndex) => {
    setSelectedPanel(newIndex)
  }

  const handleStartSearch = () => {
    setIsSearch(true)
    searchInput.current.focus()
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
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

  const eventsFavouritedIds = useMemo(() => {
    if (user && user.favedEventsID && user.favedEventsID.length) {
      return user.favedEventsID
    }

    return []
  }, [user.favedEventsID])

  const eventsFilteredBySearch = useMemo(() => {
    if (!isSearch || !searchText) return events

    return events.filter((event) => (event.ename || '').toLowerCase().includes(searchText.toLowerCase()))
  }, [events, isSearch, searchText])

  const AllEventCards = useMemo(() => {
    if (selectedPanel === PANEL_STATES.REGISTERED) return eventsFilteredBySearch.filter((event) => eventsRegisteredIds.includes(event.id))
    else if (selectedPanel === PANEL_STATES.FAVOURITES) return eventsFilteredBySearch.filter((event) => eventsFavouritedIds.includes(event.id))
    else return eventsFilteredBySearch
  }, [eventsFilteredBySearch, selectedPanel, user.favedEventsID])

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

  const generateEventCards = (events) => {
    return events.map((event) => (
      <EventCard
        event={event}
        key={event.id}
        variant='user'
        favourited={eventsFavouritedIds.includes(event.id)}
        handleCardClick={redirectToEvent}
        handleFavourite={handleFavouriteEvent}
        cardStyle={isNotMobile ? { width: 'calc(50% - 30px)' } : { width: '100%', marginRight: 0 }}
      />
    ))
  }

  return (
    <div>
      <Helmet>
        <title>Biztech User Events Dashboard</title>
      </Helmet>
      <div className={classes.container}>
        {isNotMobile && <div className={classes.sidePanelLayout}>
          <Typography variant='h1' className={classes.header}>Events</Typography>
          <List>
            <ListItem
              className={selectedPanel === PANEL_STATES.FAVOURITES
                ? classes.sidePanelActiveButton
                : classes.sidePanelButton}
              onClick={() => handlePanelChange(PANEL_STATES.FAVOURITES)}
              button
            >
              <ListItemText><StarBorder fontSize='small' />&nbsp;Favourites</ListItemText>
            </ListItem>
            <ListItem
              className={selectedPanel === PANEL_STATES.REGISTERED
                ? classes.sidePanelActiveButton
                : classes.sidePanelButton}
              onClick={() => handlePanelChange(PANEL_STATES.REGISTERED)}
              button
            >
              <ListItemText><PlaylistAddCheck fontSize='small' />&nbsp;Registered</ListItemText>
            </ListItem>
            <ListItem
              className={selectedPanel === PANEL_STATES.ALL
                ? classes.sidePanelActiveButton
                : classes.sidePanelButton}
              onClick={() => handlePanelChange(PANEL_STATES.ALL)}
              button
            >
              <ListItemText><Search fontSize='small' />&nbsp;All</ListItemText>
            </ListItem>
          </List>
        </div>}
        <div className={classes.tabsLayout}>

          <div className={classes.tabsContainer}>
            <Tabs
              value={tabIndex}
              indicatorColor='primary'
              textColor='primary'
              onChange={handleTabChange}
            >
              <Tab label='Upcoming' className={classes.tab} />
              <Tab label='Past' className={classes.tab} />
              <Tab label='All' className={classes.tab} />
            </Tabs>
            <div className={classes.search}>
              <IconButton className={classes.searchIcon} onClick={handleStartSearch}>
                <Search style={{ color: COLOR.CARD_PAPER_COLOR }}/>
              </IconButton>
              <InputBase
                inputRef={searchInput}
                placeholder='Search…'
                classes={{ input: isSearch ? classes.searchInputActive : classes.searchInput }}
                onChange={handleSearchChange}
                onBlur={() => setIsSearch(false)}
              />
            </div>
          </div>

          <EventPanel currentIndex={tabIndex} index={TAB_STATES.UPCOMING}>
            <div className={classes.rows}>
              {generateEventCards(UpcomingEventCards)}
            </div>
          </EventPanel>
          <EventPanel currentIndex={tabIndex} index={TAB_STATES.PAST}>
            <div className={classes.rows}>
              {generateEventCards(PastEventCards)}
            </div>
          </EventPanel>
          <EventPanel currentIndex={tabIndex} index={TAB_STATES.ALL}>
            <div className={classes.rows}>
              {generateEventCards(AllEventCards)}
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

export default connect(mapStateToProps, { setUser })(UserEvents)
