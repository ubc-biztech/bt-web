import React from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { fetchBackend } from '../../utils'
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

const QuickRegister = ({
  user,
  event,
  registration,
  eventRegistrationStatus,
  handleRegisterStateChangedCallback,
  sendRegistrationDataCallback,
  children
}) => {
  const classes = useStyles()
  const history = useHistory()

  const handleReturn = () => {
    history.push('/events')
  }

  const submitValues = async (values) => {
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
    let isFirstTime = false
    // if registration prop is not undefined, the event has been registered / unregistered before
    registration ? (isFirstTime = false) : (isFirstTime = true)
    fetchBackend(`/users/${values.id}`, 'GET')
      .then(async () => {
        // if get response is successful
        await fetchBackend(`/users/${id}`, 'PATCH', body)
        const result = await sendRegistrationDataCallback(id, eventID, true, isFirstTime, heardFrom)
        if (result === 'registration succeed') {
          handleRegisterStateChangedCallback(true)
        }
      })
      .catch(() => {
        // Need to create new user
        fetchBackend('/users', 'POST', body)
          .then(async (userResponse) => {
            if (userResponse.message === 'Created!') {
              const result = await sendRegistrationDataCallback(id, eventID, true, isFirstTime, heardFrom)
              if (result === 'registration succeed') {
                handleRegisterStateChangedCallback(true)
              }
            } else {
              alert('Signup failed')
            }
          })
      })
  }

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
          <title>{event.ename} - Register</title>
        </Helmet>
        {eventRegistrationStatus
          ? <div className={classes.layout}>
            <Paper className={classes.paper}>
              <div className={classes.completeContainer}>
                <div className={classes.message}>
                  <div className={classes.houseContainer}>
                    <img src={House} className={classes.house} alt='BizTech House' />
                  </div>
                  <Typography className={classes.done}>Done!</Typography>
                  <Typography>You are now registered, click <strong onClick={handleReturn} style={{ cursor: 'pointer' }}>here</strong> <br/> to return to the previous page.</Typography>
                </div>
              </div>
            </Paper>
          </div>
          : <div className={classes.layout}>
            <Paper className={classes.paper}>
              <div className={classes.container}>
                <Typography variant='h2' className={classes.header}>
                  {event.ename}
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
}

export default withRouter(QuickRegister)
