import React from 'react'
import { Helmet } from 'react-helmet'
import { Formik } from 'formik'
import * as Yup from 'yup'

import EventView from 'components/Event/EventView'
import EventRegisterForm from './EventRegisterForm'
import NotFound from 'pages/NotFound'
import { COLORS } from '../../../../constants/_constants/theme'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography } from '@material-ui/core'
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
  },
  registrationHeader: {
    borderLeft: `2px solid ${COLORS.BIZTECH_GREEN}`,
    marginTop: '35px',
    paddingLeft: '19px',
    marginLeft: '11px'
  }
}))

const EventFormContainer = (props) => {
  const classes = useStyles()
  const { eventId, event, loading } = props

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
      <EventView event={event}>
        <div className={classes.registrationHeader}>
          <Typography>Registration</Typography>
          <Typography>We need to know a little bit about you to get started.</Typography>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitValues}
        >
          {props => <EventRegisterForm {...props} />}
        </Formik>
      </EventView>
    </div>
  ) : (
    <NotFound message={`The event with id ${eventId} could not be found!`}/>
  )

  async function submitValues (values) {
    const { email, fname, lname, id, faculty, year, diet, heardFrom, gender } = values
    const eventID = event.id
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
    // TODO: Standardize the values passed to DB (right now it passes "1st Year" instead of 1)
    fetchBackend(`/users/${values.id}`, 'GET')
      .then(() => {
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
      .then(() => {
        alert('Signed Up')
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
