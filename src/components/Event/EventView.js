import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Markdown from 'components/layout/Markdown'
import ArrowRight from '@material-ui/icons/ArrowRight'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import DateComponent from '../../components/icons/DateComponent'

import { COLORS } from '../../constants/_constants/theme'

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up('sm')]: {
      width: 600,
      margin: 'auto'
    }
  },
  paper: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(3)
    }
  },
  content: {
    padding: theme.spacing(3)
  },
  arrowStyle: {
    color: COLORS.BIZTECH_GREEN,
    fontSize: '36px'
  },
  dropDown: {
    display: 'flex',
    cursor: 'pointer',
    marginLeft: '-6px'
  },
  infoText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  registrationHeader: {
    borderLeft: `2px solid ${COLORS.BIZTECH_GREEN}`,
    marginTop: '35px',
    paddingLeft: '19px',
    marginLeft: '11px'
  },
  banner: {
    maxWidth: '100%',
    borderRadius: '5px',
    height: '234px',
    width: '100%'
  },
  date: {
    position: 'absolute',
    top: '80%',
    right: '8%'
  },
  descDate: {
    color: COLORS.BIZTECH_GREEN,
    fontSize: '14px'
  },
  registrationText: {
    fontWeight: 'bold',
    fontSize: '24px'
  }
}))

function formatAMPM (date) {
  let hour = date.getHours()
  let minute = date.getMinutes()
  const ampm = hour > 12 ? 'PM' : 'AM'
  hour = hour % 12
  hour = hour !== 0 ? hour : 12
  minute = minute < 10 ? '0' + minute : minute
  return hour + ':' + minute + ' ' + ampm
}

const EventView = ({ event, isRegistered, children }) => {
  const classes = useStyles()
  const [showDescription, setShowDescription] = useState(false)

  const startDate = new Date(event.startDate)
  const month = startDate.toLocaleDateString('default', { month: 'short' })
  const dayOfMonth = startDate.getDate()
  const dayOfWeek = startDate.toLocaleDateString('default', { weekday: 'long' })
  const startTime = formatAMPM(startDate)

  const endDate = new Date(event.endDate)
  const endTime = formatAMPM(endDate)
  return (
    <React.Fragment>
      <div style={{ position: 'relative' }}>
        <img src={event.imageUrl || require('assets/placeholder.jpg')} className={classes.banner} alt='Event' />
        <div className={classes.date}>
          <DateComponent month={month} dayOfMonth={dayOfMonth} dayOfWeek={dayOfWeek} />
        </div>
      </div>

      <div className={classes.content}>
        <Typography variant='h4' align='left' gutterBottom>
          {event.ename}
        </Typography>

        <div className={classes.dropDown} onClick={() => setShowDescription(!showDescription)}>
          {showDescription ? <ArrowDropDown className={classes.arrowStyle} /> : <ArrowRight className={classes.arrowStyle} />}
          <Typography className={classes.infoText} variant='h5'>Info</Typography>
        </div>

        {showDescription ? (
          <React.Fragment>
            <Typography className={classes.descDate}>{dayOfWeek}, {month}. {dayOfMonth} {startTime}-{endTime}</Typography>
            <Markdown>
              {event.description}
            </Markdown>
          </React.Fragment>
        ) : (
          <div />
        )}

        {!isRegistered && <div className={classes.registrationHeader}>
          <Typography className={classes.registrationText}>Registration</Typography>
          <Typography>We need to know a little bit about you to get started.</Typography>
        </div>}
        {children}
      </div>
    </React.Fragment>
  )
}

export default EventView
