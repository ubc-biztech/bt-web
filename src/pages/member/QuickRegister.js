import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { fetchBackend, updateEvents } from '../../utils'
import * as Yup from 'yup'
import { Formik } from 'formik'
import RegisterQuick from '../../components/Forms/RegisterQuick'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import { Helmet } from 'react-helmet'
import { Typography } from '@material-ui/core'
import House from '../../assets/house.svg'

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up('sm')]: {
      width: '66vw',
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
  container: {
    width: '33vw',
    padding: '55px 0 55px 80px'
  },
  completeContainer: {
    position: 'relative',
    width: '33vw',
    height: '78vh'
  },
  header: {
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: '24px'
  },
  house: {
    width: '80%',
    marginLeft: '-20px',
    marginBottom: '-5px'
  },
  message: {
    width: '40%',
    position: 'absolute',
    bottom: '35%',
    left: '80%',
    textAlign: 'center'
  },
  done: {
    fontWeight: 'bold',
    fontSize: '36px'
  },
  returnMessage: {
    fontSize: '24px'
  },
  houseContainer: {
    borderBottom: '1px solid white'
  }
}))

const EventFormContainer = (props) => {
  const classes = useStyles()
  const { events } = props
  const { user } = props
  const history = useHistory()

  if (!events) {
    updateEvents()
  }
  const { id: eventId } = useParams()

  const [event, setEvent] = useState(null)
  const [isSignedUp, setIsSignedUp] = useState(false)

  const handleReturn = () => {
    history.push('/events')
  }

  useEffect(() => {
    if (eventId && events) {
      setEvent(events.find(event => event.id === eventId))
    }
  }, [events, eventId])

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    id: Yup.number('Valid Student ID required')
      .min(9999999, 'Valid Student ID required')
      .max(100000000, 'Valid Student ID required')
      .required(),
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    year: Yup.string().required('Level of study is required'),
    diet: Yup.string().required('Dietary restriction is required')
  })

  const initialValues = { email: user.email, fname: user.fname, lname: user.lname, id: user.id, faculty: user.faculty, year: user.year, diet: user.diet, gender: user.gender, heardFrom: '' }

  if (event) {
    return (
      // assumes that the event details component that uses this component (QuickRegister) does not allow
      // the user to get to this page if they are already signed up or the event has passed
      <React.Fragment>
        <Helmet>
          <title>{`${event.name} - Register`}</title>
        </Helmet>
        {isSignedUp
          ? <div className={classes.layout}>
            <Paper className={classes.paper}>
              <div className={classes.completeContainer}>
                <div className={classes.message}>
                  <div className={classes.houseContainer}>
                    <img src={House} className={classes.house} alt='BizTech House' />
                  </div>
                  <Typography className={classes.done}>done!</Typography>
                  <Typography>you are now registered, click <strong onClick={handleReturn} style={{ cursor: 'pointer' }}>here</strong> <br/> to return to the previous menu.</Typography>
                </div>
              </div>
            </Paper>
          </div>
          : <div className={classes.layout}>
            <Paper className={classes.paper}>
              <div className={classes.container}>
                <Typography variant='h2' className={classes.header}>
                  {event.name}
                </Typography>
                <Typography className={classes.subHeader}>
            Sign up Form
                </Typography>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={submitValues}>
                  {props => <RegisterQuick {...props} />}
                </Formik>
              </div>
            </Paper>
          </div>}
      </React.Fragment>
    )
  } else {
    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Skeleton animation='wave' variant='rect' width={'100%'} height={320} />
          <div className={classes.content}>

            <Grid container spacing={3}>

              <Grid item xs={12}>
                <Skeleton animation='wave' variant='rect' width={300} height={30} />
              </Grid>

              {[1, 2, 3].map((e) =>
                <Grid item container spacing={1} key={e}>
                  <Grid item xs={12}>
                    <Skeleton animation='wave' variant='rect' width={130} height={20} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton animation='wave' variant='rect' width={'100%'} height={20} />
                  </Grid>
                </Grid>)
              }

              <Grid item xs={12}>
                <Skeleton animation='wave' variant='rect' width={90} height={36} />
              </Grid>

            </Grid>
          </div>
        </Paper>
      </div>
    )
  }

  async function submitValues (values) {
    const { email, fname, lname, id, faculty, year, diet, heardFrom, gender } = values
    const eventID = event.id
    // TODO: Standardize the values passed to DB (right now it passes "1st Year" instead of 1)
    const body = {
      id,
      fname,
      lname,
      email,
      year,
      faculty,
      gender,
      diet
    }
    fetchBackend(`/users/${values.id}`, 'GET')
      .then(() => {
        // if get response is successful
        fetchBackend(`/users/${id}`, 'PATCH', body)
        registerUser(id, eventID, heardFrom)
      })
      .catch(() => {
        // Need to create new user
        fetchBackend('/users', 'POST', body)
          .then((userResponse) => {
            if (userResponse.message === 'Created!') {
              registerUser(id, eventID, heardFrom)
            } else {
              alert('Signup failed')
            }
          })
      })
  }

  async function registerUser (id, eventID, heardFrom) {
    const body = {
      id,
      eventID,
      heardFrom,
      registrationStatus: 'registered'
    }
    fetchBackend('/registrations', 'POST', body)
      .then((regResponse) => {
        alert('Signed Up')
        setIsSignedUp(true)
      })
      .catch(err => {
        if (err.status === 409) {
          alert('You cannot sign up for this event again!')
        } else {
          alert('Signup failed')
        }
      })
  }
}

const mapStateToProps = state => {
  return {
    events: state.pageState.events,
    user: state.userState.user
  }
}

export default connect(mapStateToProps, {})(EventFormContainer)
