import React, { useState, useEffect } from 'react'

import Markdown from 'components/layout/Markdown'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Slide from '@material-ui/core/Slide'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'

import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import StarIcon from '@material-ui/icons/Star'
import VisibilityIcon from '@material-ui/icons/Visibility'

import { COLORS } from 'constants/index'
import { fetchBackend } from 'utils'

let settingFavouriteData = false
const useStyles = makeStyles(theme => ({
  paper: {
    padding: '60px 0 80px 95px',
    position: 'relative'
  },

  title: {
    display: 'inline-block',
    fontSize: '36px'
  },
  description: {
    margin: '50px 100px 67px 0px'
  },
  favLogo: {
    position: 'absolute',
    top: '4.5px',
    right: '100px',
    fill: COLORS.BIZTECH_GREEN,
    fontSize: '32px'
  },
  viewLogo: {
    position: 'absolute',
    right: '150px',
    top: '6px',
    fontSize: '32px'
  },
  button: {
    marginLeft: '10px',
    color: COLORS.WHITE,
    padding: '6px 12px'
  },
  buttonGroup: {
    position: 'absolute',
    right: '100px'
  }
}))

const sendFavouriteData = async (userID, eventID, isFavourite) => {
  if (settingFavouriteData) {
    return Promise.resolve('in_progress')
  }
  settingFavouriteData = true
  const bodyData = {
    eventID: eventID,
    isFavourite: isFavourite
  }
  try {
    await fetchBackend(`/users/favEvent/${userID}`, 'PATCH', bodyData)
    settingFavouriteData = false
    let responesMsg = ''
    isFavourite ? (responesMsg = 'favourite') : (responesMsg = 'unfavourite')
    responesMsg += ' succeed'
    return Promise.resolve(responesMsg)
  } catch (error) {
    settingFavouriteData = false
    return Promise.reject(error)
  }
}

const TransitionUp = props => {
  return <Slide {...props} direction='up' />
}

const EventDescription = ({
  user,
  event,
  registration,
  eventRegistrationStatus,
  handleRegisterClickedCallback,
  handleRegisterStateChangedCallback,
  sendRegistrationDataCallback,
  children
}) => {
  const classes = useStyles()
  const [eventFavStatus, setEventFavStatus] = useState(false)
  const [snackOpen, setSnackOpen] = React.useState(false)
  const [snackMsg, setSnackMsg] = React.useState('')
  // called after the first dom mutation, right before render()
  useEffect(() => {
    if (event && user && user.favedEventsID) {
      if (user.favedEventsID.indexOf(event.id) !== -1) {
        setEventFavStatus(true)
      }
    }
  }, [event, user, registration])

  const handleClickFavouriteEvent = async (userID, eventID) => {
    try {
      const favResult = await sendFavouriteData(
        userID,
        eventID,
        !eventFavStatus
      )
      setEventFavStatus(!eventFavStatus)
      openSnackBar(favResult)
    } catch (error) {
      openSnackBar(error)
    }
  }

  const handleClickRegisterEvent = async (userID, eventID, isRegister) => {
    if (isRegister) {
      // if user is trying to register, display the quick register component
      handleRegisterClickedCallback(isRegister)
      return
    }
    // otherwise unregister the user
    let isFirstTime = false
    registration ? (isFirstTime = false) : (isFirstTime = true) // if registration prop is not undefined, the event has been registered / unregistered before
    try {
      const registrationResult = await sendRegistrationDataCallback(
        userID,
        eventID,
        isRegister,
        isFirstTime
      )
      if (registrationResult === 'unregistration succeed') {
        handleRegisterStateChangedCallback(false)
      }
      openSnackBar(registrationResult)
    } catch (error) {
      openSnackBar(error)
    }
  }

  const openSnackBar = msg => {
    setSnackMsg(msg)
    setSnackOpen(true)
    setTimeout(() => {
      setSnackOpen(false)
    }, 1000)
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <div style={{ position: 'relative' }}>
          <Typography variant='h1' className={classes.title}>
            {event.id}
          </Typography>
          <VisibilityIcon className={classes.viewLogo} fill='none' />
          {eventFavStatus ? (
            <StarIcon
              className={classes.favLogo}
              onClick={() => {
                handleClickFavouriteEvent(user.id, event.id)
              }}
            />
          ) : (
            <StarBorderOutlinedIcon
              className={classes.favLogo}
              onClick={() => {
                handleClickFavouriteEvent(user.id, event.id)
              }}
            />
          )}
        </div>
        <Markdown className={classes.description}>{event.description}</Markdown>
        <div className={classes.buttonGroup}>
          {eventRegistrationStatus ? (
            <React.Fragment>
              <Button
                style={{ backgroundColor: COLORS.LIGHT_BACKGROUND_COLOR }}
                className={classes.button}
                onClick={() => {
                  handleClickRegisterEvent(user.id, event.id, false)
                }}
              >
                Unregiseter
              </Button>
              <Button
                disabled
                style={{ backgroundColor: COLORS.BIZTECH_GREEN }}
                className={classes.button}
              >
                Registered
              </Button>
            </React.Fragment>
          ) : (
            <Button
              style={{ backgroundColor: COLORS.BIZTECH_GREEN }}
              className={classes.button}
              onClick={() => {
                handleClickRegisterEvent(user.id, event.id, true)
              }}
            >
              sign me up
            </Button>
          )}
        </div>
      </Paper>
      <Snackbar
        open={snackOpen}
        TransitionComponent={TransitionUp}
        message={snackMsg}
        key='favourite'
      />
    </React.Fragment>
  )
}

export default EventDescription
