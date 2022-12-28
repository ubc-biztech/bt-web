/* eslint react-hooks/exhaustive-deps: 0 */
import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback
} from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Joyride from "react-joyride";
import { Link } from 'react-router-dom';

import {
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  InputBase,
  Chip
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { StarBorder, PlaylistAddCheck, Search } from '@material-ui/icons'
import EventCard from 'components/Event/EventCard'
import Loading from 'pages/Loading'

import { COLORS } from 'constants/index'
import { setUser, fetchUserRegisteredEvents } from 'store/user/userActions'
import { fetchEvents } from 'store/event/eventActions'
import { checkViewedFeatures, fetchBackend, setViewedFeatures } from 'utils'

// States for the filters
const PERSONALIZATION_STATES = {
  FAVOURITES: {
    index: 0,
    displayName: 'Favourites',
    icon: <StarBorder fontSize='small' />
  },
  REGISTERED: {
    index: 1,
    displayName: 'Registered',
    icon: <PlaylistAddCheck fontSize='small' />
  },
  ALL: {
    index: 2,
    displayName: 'All',
    icon: <Search fontSize='small' />
  }
}

const TIME_STATES = {
  UPCOMING: {
    index: 0,
    displayName: 'Upcoming',
    filterFunction: (event) =>
      event.startDate && new Date(event.startDate) >= new Date()
  },
  PAST: {
    index: 1,
    displayName: 'Past',
    filterFunction: (event) =>
      event.startDate && new Date(event.startDate) < new Date()
  },
  ALL: {
    index: 2,
    displayName: 'All',
    filterFunction: () => true
  }
}

const useStyles = makeStyles((theme) => ({
  header: {
    color: COLORS.BIZTECH_GREEN
  },
  headerMobile: {
    color: COLORS.BIZTECH_GREEN,
    position: 'absolute'
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
    marginRight: '3em',
    width: '135px'
  },
  sidePanelButton: {
    textAlign: 'right',
    whiteSpace: 'nowrap'
  },
  sidePanelActiveButton: {
    textAlign: 'right',
    whiteSpace: 'nowrap',
    borderRight: `2px solid ${COLORS.BIZTECH_GREEN}`
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
    color: `${COLORS.WHITE} !important`
  },
  search: {
    display: 'flex',
    height: '100%',
    maxWidth: '100%',
    background: 'white',
    borderRadius: '3em',
    marginLeft: 'auto',
    zIndex: '100'
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
    color: COLORS.CARD_PAPER_COLOR,
    transition: theme.transitions.create('width')
  },
  searchInputActive: {
    width: '70vw',
    color: COLORS.CARD_PAPER_COLOR,
    transition: theme.transitions.create('width')
  },
  mobileFilters: {
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none'
  },
  noMatchingEvents: {
    padding: '1em',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  chipFilter: {
    width: '100%',
    marginRight: '0.5em'
  },
  rows: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}))

const steps = [
  {
    disableBeacon: true,
    target: ".search-all",
    title: "All Events",
    content:
      "Here you can see the Upcoming and Past events"
  },
  {
    target: ".favourite",
    title: "Favourite Events",
    content:
      "Here you can see your favourite and registered events"
  },
  {
    target: ".event-card",
    title: "Event",
    disableBeacon: true,
    content:
      "Click on an event to know more about it"
  },
  {
    target: ".search-btn",
    title: "Search",
    disableBeacon: true,
    hideCloseButton: true,
    hideFooter: true,
    disableOverlayClose: true,
    content:
    <div>
      <p>Search for any event here</p>
      <p>Click&nbsp;
        <Link to="/member/profile" style={{ color: '#79D03F' }}>here</Link> 
        &nbsp;to go to Profile 
      </p>
    </div>
  }
];

function ShowOnbaording() {
  if (!checkViewedFeatures(user, 'Events')) {
    setViewedFeatures(user, 'Events') 
    return (
      <Joyride
            steps={steps}
            continuous = {true}
            showProgress = {true}
            disableScrolling = {true}
            styles={{
              options: {
                backgroundColor: '#182138',
                primaryColor: '#79D03F',
                textColor: '#FFFFFF',
                zIndex: 1000,
              },
              tooltip: {
                borderRadius: 10
              },
              buttonNext: {
                outline: 'none',
                borderRadius: 5
              },
              buttonBack: {
                outline: 'none',
                borderRadius: 5
              }
            }}
        />
    );
  } else {
    return null
  }
}

function EventsDashboard (props) {
  const [isSearch, setIsSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [timeIndex, setTimeIndex] = useState(TIME_STATES.ALL.index)
  const [personalizationIndex, setPersonalizationIndex] = useState(
    PERSONALIZATION_STATES.ALL.index
  )

  const history = useHistory()
  const classes = useStyles()
  const searchInput = useRef()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { events, user, userRegisteredEvents, loading } = props
  useEffect(() => {
    fetchEvents()
    if (user && user.email) fetchUserRegisteredEvents({ userId: user.email })
  }, [])

  const handleFavouriteEvent = async (eventId, year, toggle) => {
    const body = { eventID: eventId, year, isFavourite: toggle }
    await fetchBackend(`/users/favEvent/${user.email}`, 'PATCH', body)
    const oldEventIds = user['favedEventsID;year'] ? user['favedEventsID;year'] : []
    const newEventIds = toggle
      ? [...oldEventIds, `${eventId};${year}`]
      : oldEventIds.filter((id) => id !== `${eventId};${year}`)
    await props.setUser({
      ...user,
      'favedEventsID;year': newEventIds
    })
  }

  const handleTimeChange = (event, newIndex) => {
    setTimeIndex(newIndex)
  }

  const handlePersonalizationChange = (newIndex) => {
    setPersonalizationIndex(newIndex)
  }

  const handleStartSearch = () => {
    setIsSearch(true)
    searchInput.current.focus()
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  const redirectToEvent = (e, eventId, eventYear) => {
    history.push(`/event/${eventId}/${eventYear}/register`)
  }

  const filterEventsByPersonalization = (
    events, 
    personalizationIndex, 
    userRegisteredEventIds, 
    userFavouritedEventIds
  ) => {
    switch (personalizationIndex) {
      case PERSONALIZATION_STATES.REGISTERED.index:
        return events.filter((event) =>
          userRegisteredEventIds.includes(event.id)
        )
      case PERSONALIZATION_STATES.FAVOURITES.index:
        return events.filter((event) =>
          userFavouritedEventIds.includes(`${event.id};${event.year}`)
        )
      default:
        return events
    }
  }

  const userRegisteredEventIds = useMemo(() => {
    if (userRegisteredEvents && typeof userRegisteredEvents.data[0] === 'object') {
      return userRegisteredEvents.data.map((event) => event['eventID;year'].split(';')[0])
    }

    return []
  }, [userRegisteredEvents])

  const userFavouritedEventIds = useMemo(() => {
    if (user && user['favedEventsID;year'] && user['favedEventsID;year'].length) {
      return user['favedEventsID;year']
    }

    return []
  }, [user])

  const eventsFilteredBySearch = useMemo(() => {
    if (!isSearch || !searchText) return events

    return events.filter((event) =>
      (event.ename || '').toLowerCase().includes(searchText.toLowerCase())
    )
  }, [events, isSearch, searchText])

  const generateEventCards = useCallback(() => {
    // only show published events to members
    const publishedEvents = eventsFilteredBySearch.filter((event) => event.isPublished)

    // filter events by personalization
    const eventsFilteredByPersonalization = filterEventsByPersonalization(
      publishedEvents, 
      personalizationIndex, 
      userRegisteredEventIds, 
      userFavouritedEventIds
    )

    // determine which option is clicked by the personalization index
    const timeOption = Object.values(TIME_STATES).find(
      (option) => option.index === timeIndex
    )

    // filter events by time
    let eventsFilteredByTime = eventsFilteredByPersonalization.filter(
      timeOption.filterFunction
    )

    eventsFilteredByTime = eventsFilteredByTime.sort((a, b) => { 
      return new Date(b.startDate) - new Date(a.startDate)
    })

    return eventsFilteredByTime.length > 0 ? 
      eventsFilteredByTime.map((event) => (
        <EventCard
          event={event}
          key={event.id + event.year}
          variant={!user || user.admin ? 'none' : 'user'}
          favourited={userFavouritedEventIds.includes(`${event.id};${event.year}`)}
          handleCardClick={redirectToEvent}
          handleFavourite={handleFavouriteEvent}
          cardStyle={
            isMobile
              ? { width: '100%', marginRight: 0 }
              : { width: 'calc(50% - 30px)' }
          }
        />
      )) : 
      <div className={classes.noMatchingEvents}>
        <Typography variant='h2'>
          No matching events found
        </Typography>
      </div>
  }, [
    eventsFilteredBySearch,
    userFavouritedEventIds,
    personalizationIndex,
    timeIndex,
    isMobile
  ])

  if (loading) return <Loading message='Loading user &amp; event data...' />
  return (
    <div>
      <Helmet>
        <title>Biztech User Events Dashboard</title>
      </Helmet>
      <div className={classes.container}>
        {/* Left panel for additional event filters (only on desktop view) */}
        {!isMobile && (
          <div className={classes.sidePanelLayout}>
            <Typography variant='h1' className={classes.header}>Events</Typography>
            <div className='favourite'>
            <List>
              {Object.values(PERSONALIZATION_STATES).map((pState) => {
                return (!(pState.displayName !== 'All' && !user) &&
                  <ListItem
                    key={pState.index}
                    className={
                      personalizationIndex === pState.index
                        ? classes.sidePanelActiveButton
                        : classes.sidePanelButton
                    }
                    onClick={() => handlePersonalizationChange(pState.index)}
                    button
                  >
                    <ListItemText>
                      {pState.icon}&nbsp;{pState.displayName}
                    </ListItemText>
                  </ListItem>
              )})}
            </List>
            </div>
          </div>
        )}

        <div className={classes.tabsLayout}>
          {/* Upper tabs for filtering (only on desktop view) and searching for events */}
          <div className={classes.tabsContainer}>
            {isMobile ? (
              <Typography variant='h1' className={classes.headerMobile}>
                Events
              </Typography>
            ) : (
              <div className='search-all'> 
              <Tabs
                value={timeIndex}
                indicatorColor='primary'
                textColor='primary'
                onChange={handleTimeChange}
              >
                {Object.values(TIME_STATES).map((tState) => (
                  <Tab
                    key={tState.index}
                    label={tState.displayName}
                    className={classes.tab}
                  />
                ))}
              </Tabs>
              </div>
            )}

            {/* The search button */}
            <div className={classes.search}>
            <div className='search-btn'>
              <IconButton
                className={classes.searchIcon}
                onClick={handleStartSearch}
              >
                <Search style={{ color: COLORS.CARD_PAPER_COLOR }} />
              </IconButton>
              </div>
              <InputBase
                inputRef={searchInput}
                placeholder='Search…'
                classes={{
                  input: isSearch
                    ? classes.searchInputActive
                    : classes.searchInput
                }}
                onChange={handleSearchChange}
                onBlur={() => setIsSearch(false)}
              />
            </div>
          </div>

          {/* Filters in mobile view */}
          {isMobile && (
            <div className={classes.mobileFilters}>
              {Object.values(TIME_STATES).map(
                (tState) =>
                  tState.displayName !== 'All' && // don't render "All"
                  (timeIndex === tState.index ? (
                    <Chip
                      key={tState.displayName}
                      className={classes.chipFilter}
                      size='small'
                      color='primary'
                      label={tState.displayName}
                      onDelete={() =>
                        handleTimeChange({}, TIME_STATES.ALL.index)
                      }
                    />
                  ) : (
                    <Chip
                      key={tState.displayName}
                      className={classes.chipFilter}
                      size='small'
                      color='secondary'
                      label={tState.displayName}
                      onClick={() => handleTimeChange({}, tState.index)}
                    />
                  ))
              )}
              {Object.values(PERSONALIZATION_STATES).map(
                (pState) =>
                  (pState.displayName !== 'All' && user) &&
                  (personalizationIndex === pState.index ? (
                    <Chip
                      key={pState.displayName}
                      className={classes.chipFilter}
                      size='small'
                      color='primary'
                      label={pState.displayName}
                      onDelete={() =>
                        handlePersonalizationChange(
                          PERSONALIZATION_STATES.ALL.index
                        )
                      }
                    />
                  ) : (
                    <Chip
                      key={pState.displayName}
                      className={classes.chipFilter}
                      size='small'
                      color='secondary'
                      label={pState.displayName}
                      onClick={() => handlePersonalizationChange(pState.index)}
                    />
                  ))
              )}
            </div>
          )}

          {/* The list of events */}
          <div className='event-card'>
          <div className={classes.rows}>{generateEventCards()}</div>
          </div>
        </div>
      </div>
        <ShowOnbaording>
        </ShowOnbaording>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    events: state.eventState.events.data,
    user: state.userState.user.data,
    userRegisteredEvents: state.userState.userRegisteredEvents.data,
    loading:
      state.eventState.events.loading ||
      state.userState.userRegisteredEvents.loading
  }
}

export default connect(mapStateToProps, { setUser })(EventsDashboard)
