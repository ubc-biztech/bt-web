import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Typography from '@material-ui/core/Typography'
import EventCard from './EventCard'
import { fetchBackend, updateEvents } from '../../utils'
import { COLOR } from '../../constants/Constants'
import House from '../../assets/house.svg'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

const useStyles = makeStyles({
  root: {
    width: '719px',
    marginTop: '27px'
  },
  home: {
    color: COLOR.BIZTECH_GREEN,
    fontStyle: 'normal',
    fontWeight: 'bold',
    paddingLeft: '85px',
    paddingTop: '50px'
  },
  page: {
    height: '100vh'
  },
  container: {
    display: 'flex'
  },
  header: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    paddingLeft: '76px',
    paddingTop: '45px'
  },
  reward: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '22px',
    paddingLeft: '76px',
    paddingTop: '15px'
  },
  house: {
    position: 'absolute',
    left: '685px',
    top: '99px'
  }
})

function UserHome (props) {
  const classes = useStyles()
  const [featuredEvent, setFeaturedEvent] = useState()
  const [nextEvent, setNextEvent] = useState()
  const getFeaturedEvent = () => {
    if (props.events && props.events.length) {
      setFeaturedEvent(props.events[Math.floor(Math.random() * (props.events.length - 1))])
    }
  }

  /**
             * gets the next event that the user is registered for
             * verifies that the event is after the current time
             * sets next event to 'None Registered!' if no events found
             */
  const getNextEvent = async () => {
    const params = new URLSearchParams({
      id: props.user.id
    })
    await fetchBackend(`/registrations?${params}`, 'GET')
      .then(async response => {
        if (response && response.size > 0) {
          // iterate over events - the first one that is found in registrations is the closest event assuming that events are already sorted by date
          if (props.events) {
            props.events.forEach(event => {
              const index = response.data.findIndex(registration => registration.eventID === event.id)
              if (index !== -1) {
                // if the event has not passed yet
                if (new Date(event.startDate).getTime() > new Date().getTime()) {
                  return setNextEvent(event)
                } else {
                  return setNextEvent({
                    ename: 'None Registered!'
                  })
                }
              }
            })
          }
        } else {
          setNextEvent({
            ename: 'None Registered!'
          })
        }
      })
  }

  // set featured event and nextEvent on initial render
  if (!featuredEvent && !nextEvent) {
    if (!props.events) {
      updateEvents()
    }
    getFeaturedEvent()
    getNextEvent()
  }

  function Greeting (props) {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant='h2' className={classes.header}>Hi {props.user.fname}!</Typography>
          <Typography className={classes.reward}>You are X events away from a reward!</Typography>
        </CardContent>
        <img src={House} className={classes.house} alt='BizTech House' />
      </Card>
    )
  }

  function SubComponent (props) {
    return (
      <Card classes={{ root: classes.root }}>
        <Typography variant='h2' className={classes.header}>{props.header}</Typography>
        {props.content}
      </Card>
    )
  }

  return (
    <div className={classes.page}>
      <Helmet>
        <title>Biztech User Dashboard</title>
      </Helmet>
      <Typography className={classes.home} variant='h3'>Home</Typography>
      <div className={classes.container}>
        <div style={{ marginLeft: '85px' }}>
          <Greeting user={props.user} />
          <SubComponent header='Progress' />
        </div>
        <div style={{ marginLeft: '34px' }}>
          <SubComponent header='Sticker Collection' />
          <SubComponent header='Prizes' />
          <div className={classes.container}>
            <EventCard type={'Next Event'} event={nextEvent} />
            <EventCard type={'Featured'} event={featuredEvent} />
          </div>
        </div>
      </div>
    </div>

  )
}

function mapStateToProps (state) {
  return {
    events: state.pageState.events
  }
}

export default connect(mapStateToProps)(UserHome)
