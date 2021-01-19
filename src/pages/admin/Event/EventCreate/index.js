import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'

import EventView from 'components/Event/EventView'
import EventCreateForm from './EventCreateForm'

import { fetchBackend, log } from 'utils'

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      margin: 'auto'
    }
  },
  paper: {
    [theme.breakpoints.up('sm')]: {
      width: 600,
      margin: theme.spacing(3)
    }
  },
  content: {
    padding: theme.spacing(3)
  }
}))

export default function EventCreate () {
  const classes = useStyles()
  const [previewEvent, setPreviewEvent] = useState({})

  const validationSchema = Yup.object({
    ename: Yup.string().required(),
    slug: Yup.string().matches(/^[a-z\-0-9]*$/, 'Slug must be lowercase and have no whitespace').required(),
    description: Yup.string().required(),
    capacity: Yup.number('Valid number required')
      .min(0, 'Valid capacity required')
      .required(),
    // partners: Yup.string().required(),
    elocation: Yup.string().required(),
    longitude: Yup.number('Valid number required')
      .min(-180, 'Valid number required')
      .max(180, 'Valid number required')
      .required(),
    latitude: Yup.number('Valid number required')
      .min(-180, 'Valid number required')
      .max(180, 'Valid number required')
      .required(),
    facebookUrl: Yup.string().url(),
    imageUrl: Yup.string().url().required()
  })

  const initialValues = {
    ename: '',
    slug: '',
    description: '',
    capacity: '',
    facebookUrl: '',
    elocation: '',
    longitude: '',
    latitude: '',
    imageUrl: '',
    startDate: new Date(),
    endDate: new Date()
  }

  return (
    <div className={classes.layout}>
      <Helmet>
        <title>Create Event - BizTech Admin</title>
      </Helmet>
      <Paper className={classes.paper}>
        <div className={classes.content}>
          <Typography variant='h4' align='center' gutterBottom>
                        New Event
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitValues}
          >
            {props => <EventCreateForm updatePreview={setPreviewEvent} {...props} />}
          </Formik>
        </div>
      </Paper>

      <Paper className={classes.paper}>
        <EventView event={previewEvent}/>
      </Paper>
    </div>
  )

  async function submitValues (values) {
    const body = {
      ename: values.ename,
      id: values.slug,
      year: values.startDate.getFullYear(),
      description: values.description,
      capac: values.capacity,
      elocation: values.elocation,
      longitude: values.longitude,
      latitude: values.latitude,
      imageUrl: values.imageUrl,
      facebookUrl: values.facebookUrl,
      startDate: values.startDate,
      endDate: values.endDate
    }
    fetchBackend('/events', 'POST', body)
      .then(response => {
        alert(response.message)
        window.location.href = '/'
      })
      .catch(err => {
        log(err)
        if (err.status === 409) {
          alert('Failed. Event with that slug/id and year already exists')
        } else alert(err.message + ' Please contact a dev')
      })
  }
}
