import React, { useState } from 'react'
import Markdown from 'components/layout/Markdown'
import { COLORS } from '../../constants/_constants/theme'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import ArrowRight from '@material-ui/icons/ArrowRight'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import DateComponent from '../../components/icons/DateComponent'
import EventIcon from '@material-ui/icons/Event'

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
    fontSize: '14px',
    marginLeft: '5px'
  },
  desc: {
    [theme.breakpoints.down('sm')]: {
      border: `1px solid ${COLORS.CARD_PAPER_COLOR}`,
      padding: '10px'
    }
  },
  registrationText: {
    fontWeight: 'bold',
    fontSize: '24px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px'
    }
  },
  subText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
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

const EventView = ({ event, children }) => {
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
          <div className={classes.desc}>
            <div style={{ display: 'flex' }}>
              <EventIcon fontSize='small' style={{ color: COLORS.BIZTECH_GREEN }}/>
              <Typography className={classes.descDate}>{dayOfWeek}, {month}. {dayOfMonth} {startTime}-{endTime}</Typography>
            </div>
            <Markdown>
              {event.description}
            </Markdown>
          </div>
        ) : (
          <div />
        )}

        <div className={classes.registrationHeader}>
          <Typography className={classes.registrationText}>Registration</Typography>
          <Typography className={classes.subText}>We need to know a little bit about you to get started.</Typography>
        </div>
        {children}
      </div>
    </React.Fragment>
  )
}

export default EventView
