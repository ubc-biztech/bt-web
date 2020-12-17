import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import { Formik } from 'formik'
import * as Yup from 'yup'

import EventView from 'components/Event/EventView'
import EventRegisterForm from './EventRegisterForm'
import EventRegisterSuccess from './EventRegisterSuccess'
import NotFound from 'pages/NotFound'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import { fetchBackend } from 'utils'

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up('sm')]: {
      width: 850,
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
  }
}))

const EventFormContainer = (props) => {
  const classes = useStyles()
  const { eventId, event, upcomingEvents, loading } = props

  const [registration, setRegistration] = useState({
    isRegistered: false,
    registeredEmail: undefined
  });

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    id: Yup.number('Valid Student ID required')
      .min(9999999, 'Valid Student ID required')
      .max(100000000, 'Valid Student ID required')
      .required(),
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    faculty: Yup.string().required('Faculty is required'),
    year: Yup.string().required('Level of study is required')
    // diet: Yup.string().required('Dietary restriction is required')
  })

  const initialValues = { email: '', fname: '', lname: '', id: '', faculty: '', year: '', diet: '', gender: '', heardFrom: '' }
  
  const {isRegistered, registeredEmail} = registration;

  if (loading) {
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
  return event ? (
    <div className={classes.layout}>
      <Helmet>
        <title>{event.ename} - Register</title>
      </Helmet>
      <EventView event={event} isRegistered={isRegistered}>
        { isRegistered ? <EventRegisterSuccess email={registeredEmail} upcomingEvents={upcomingEvents}/>: 
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitValues}
        >
          {props => <EventRegisterForm {...props} />}
        </Formik> }
      </EventView> 
      
    </div>
  ) : (
    <NotFound message={`The event with id ${eventId} could not be found!`}/>
  )

  async function submitValues (values) {
    const { email, fname, lname, id, faculty, year, diet, heardFrom, gender } = values
    const eventID = event.id
    const eventYear = event.year
    const body = {
      id: parseInt(id),
      fname,
      lname,
      email,
      userYear: year,
      faculty,
      gender,
      diet
    }
    // TODO: Standardize the values passed to DB (right now it passes "1st Year" instead of 1)
      fetchBackend('/users', 'POST', body)
        .then((userResponse) => {
          if (userResponse.message === 'Created!') {
            registerUser(id, eventID, eventYear, heardFrom)
          } else {
            alert('Signup failed')
          }
        })
        .catch(err => {
          // If the error is not "User could not be created because it already exists"
          if(err.status !== 409){
            alert('Can not create user');
          }
          registerUser(id, eventID, eventYear, heardFrom, email)
        })
     
  }

  async function registerUser (id, eventID, eventYear, heardFrom, email) {
    const body = {
      id: parseInt(id),
      eventID,
      year: eventYear,
      heardFrom,
      registrationStatus: 'registered'
    }
    fetchBackend('/registrations', 'POST', body)
      .then(() => {
        alert('Congratulations! You are now signed up.');
        setRegistration({...registration, isRegistered: true, registeredEmail: email});
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

export default EventFormContainer
