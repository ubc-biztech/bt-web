import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import EventDescription from './EventDescription'
import QuickRegister from 'pages/member/Event/QuickRegister'

import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { REGISTRATION_STATUS } from 'constants/index'
import { updateEvents, updateRegisteredEvents, fetchBackend } from 'utils'

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up('sm')]: {
      width: '66vw',
      margin: 'auto'
    }
  },
  returnDiv: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    width: '66vw'
  },
  returnText: {
    fontSize: '24px',
    paddingLeft: '15px'
  },
  backArrowIcon: {
    fontSize: '32px'
  }
}))

const EventDetails = props => {
  const classes = useStyles()
  const history = useHistory()
  const { id: eventId } = useParams()
  const { user, events, registrations } = props
  if (!events) {
    updateEvents()
  }
  if (!registrations) {
    updateRegisteredEvents()
  }
  const [event, setEvent] = useState(null)
  const [registration, setRegistration] = useState(null)
  const [isRegisterBtnClicked, setIsRegisterBtnClicked] = useState(false)
  const [eventRegistrationStatus, setEventRegistrationStatus] = useState(false)

  useEffect(() => {
    if (events && eventId) {
      setEvent(events.find(event => event.id === eventId))
    }
    if (registrations && eventId) {
      setRegistration(
        registrations.find(registration => registration.eventID === eventId)
      )
    }
    if (
      registration &&
      registration.registrationStatus === REGISTRATION_STATUS.REGISTERED
    ) {
      setEventRegistrationStatus(true)
    }
  }, [
    event,
    events,
    setEvent,
    registration,
    registrations,
    setRegistration,
    setEventRegistrationStatus,
    eventId
  ])

  const handleReturnClicked = () => {
    history.push('/events')
  }

  // change isRegister when 'sign me up' button is clicked
  // for conditionally rendering EventDescription OR QuickRegister Page
  const handleRegisterClickedCallback = (registerBtnClicked) => {
    setIsRegisterBtnClicked(registerBtnClicked)
  }

  // change registerState when current event is registered/unregistered
  // for conditionally rendering the registration status UI on BOTH EventDescription AND QuickRegister page
  const handleRegisterStateChangedCallback = (registered) => {
    setEventRegistrationStatus(registered)
  }

  let settingRegistrationData = false

  const sendRegistrationDataCallback = async (id, eventID, isRegister, isFirstTime, heardFrom) => {
    if (settingRegistrationData === true) {
      return Promise.resolve('in_progress')
    }
    settingRegistrationData = true
    let registrationStatus = ''
    let method = ''
    let path = ''
    if (isRegister) {
      registrationStatus = REGISTRATION_STATUS.REGISTERED
    } else {
      registrationStatus = REGISTRATION_STATUS.CANCELLED
    }
    const body = {
      eventID: eventID,
      registrationStatus: registrationStatus
    }
    if (isFirstTime) {
      body.id = id
      method = 'POST'
      path = '/registrations'
      if (heardFrom) {
        body.heardFrom = heardFrom
      }
    } else {
      method = 'PUT'
      path = `/registrations/${id}`
    }
    try {
      await fetchBackend(path, method, body)
      settingRegistrationData = false
      let responesMsg = ''
      isRegister
        ? (responesMsg = 'registration')
        : (responesMsg = 'unregistration')
      responesMsg += ' succeed'
      return Promise.resolve(responesMsg)
    } catch (error) {
      settingRegistrationData = false
      return Promise.reject(error)
    }
  }

  return event ? (
    <React.Fragment>
      <Helmet>
        <title>{event.ename} - BizTech Members</title>
      </Helmet>
      <div className={classes.layout}>
        <div className={classes.returnDiv}>
          <ArrowBackIcon
            className={classes.backArrowIcon}
            onClick={handleReturnClicked}
          ></ArrowBackIcon>
          <Typography className={classes.returnText}>All Events</Typography>
        </div>
        {isRegisterBtnClicked ? (
          <QuickRegister
            event={event}
            user={user}
            registration={registration}
            eventRegistrationStatus={eventRegistrationStatus}
            handleRegisterStateChangedCallback={handleRegisterStateChangedCallback}
            handleRegisterClickedCallback={handleRegisterClickedCallback}
            sendRegistrationDataCallback={sendRegistrationDataCallback}
          />
        ) : (
          <EventDescription
            event={event}
            user={user}
            registration={registration}
            eventRegistrationStatus={eventRegistrationStatus}
            handleRegisterStateChangedCallback={handleRegisterStateChangedCallback}
            handleRegisterClickedCallback={handleRegisterClickedCallback}
            sendRegistrationDataCallback={sendRegistrationDataCallback}
          />
        )}
      </div>
    </React.Fragment>
  ) : (
    <CircularProgress />
  )
}

const mapStateToProps = state => {
  return {
    events: state.pageState.events
  }
}

export default connect(mapStateToProps, {})(EventDetails)
