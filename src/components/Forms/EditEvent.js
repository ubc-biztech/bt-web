import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers'
import ThemeProvider from '../ThemeProvider'
import InfoIcon from '@material-ui/icons/Info'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Typography } from '@material-ui/core'

export default function EditEventForm (props) {
  const {
    values: { ename, slug, description, capacity, elocation, longitude, latitude, facebookUrl, imageUrl, startDate, endDate },
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    setFieldTouched,
    dirty,
    isSubmitting,
    submitCount,
    updatePreview
  } = props

  useEffect(() => {
    updatePreview({ ename, description, imageUrl })
  }, [updatePreview, ename, description, imageUrl])

  const change = (name, e) => {
    e.persist()
    handleChange(e)
    setFieldTouched(name, true, false)
  }

  const handleStartDateChange = (date) => {
    setFieldValue('startDate', date)
  }

  const handleEndDateChange = (date) => {
    setFieldValue('endDate', date)
  }

  const textFieldError = (id) => {
    return (errors[id] && submitCount > 0) || (touched[id] ? errors[id] : '')
  }

  const handleInfoClick = () => {
    alert('Longitude and latitude are used for routing purposes for the mobile app. These values can be found on Google Maps by right clicking any location and pressing "What\'s here?"')
  }

  const handleLocation = (e) => {
    const value = e.target.value
    let location, longitude, latitude
    switch (value) {
      case 'Nest':
        location = 'UBC AMS Nest'
        longitude = '-123.249818'
        latitude = '49.266503'
        break
      case 'Hennings':
        location = 'Hennings'
        longitude = '-123.252198'
        latitude = '49.266487'
        break
      case 'Sauder':
        location = 'UBC Sauder School of Business'
        longitude = '-123.253800'
        latitude = '49.264861'
        break
      case 'Birmingham':
        location = 'Birmingham, Henry Angus'
        longitude = '-123.253929'
        latitude = '49.265112'
        break
      case 'Orchard':
        location = 'Orchard Commons'
        longitude = '-123.251181'
        latitude = '49.260396'
        break
      default:
        ;
    }
    e.persist()
    setFieldValue('elocation', location)
    setFieldValue('longitude', longitude)
    setFieldValue('latitude', latitude)
  }

  return (
    <ThemeProvider>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id='ename'
              label='Event Name'
              fullWidth
              helperText={textFieldError('ename')}
              error={!!textFieldError('ename')}
              value={ename}
              onChange={change.bind(null, 'ename')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='slug'
              label='Slug (Not editable)'
              fullWidth
              disabled
              value={slug}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='description'
              label='Description'
              multiline
              fullWidth
              helperText={textFieldError('description')}
              error={!!textFieldError('description')}
              value={description}
              onChange={change.bind(null, 'description')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='capacity'
              label='Capacity'
              type='number'
              min='0'
              fullWidth
              helperText={textFieldError('capacity')}
              error={!!textFieldError('capacity')}
              value={capacity}
              onChange={change.bind(null, 'capacity')}
            />
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12} sm={6}>
              <KeyboardDateTimePicker
                margin='normal'
                label='Start Date'
                value={startDate}
                onChange={handleStartDateChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <KeyboardDateTimePicker
                margin='normal'
                label='End Date'
                minDate={startDate}
                value={endDate}
                onChange={handleEndDateChange}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item xs={12}>
            <Typography>Some common event locations (optional):</Typography>
            <Select fullWidth defaultValue='' onClick={handleLocation.bind(null)}>
              <MenuItem value={'Nest'}>Nest</MenuItem>
              <MenuItem value={'Hennings'}>Hennings</MenuItem>
              <MenuItem value={'Sauder'}>Sauder</MenuItem>
              <MenuItem value={'Birmingham'}>Birmingham, HA</MenuItem>
              <MenuItem value={'Orchard'}>Orchard</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id='elocation'
              label='Location'
              fullWidth
              helperText={textFieldError('elocation')}
              error={!!textFieldError('elocation')}
              value={elocation}
              onChange={change.bind(null, 'elocation')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id='longitude'
              label='Longitude'
              fullWidth
              helperText={textFieldError('longitude')}
              error={!!textFieldError('longitude')}
              value={longitude}
              onChange={change.bind(null, 'longitude')} />
          </Grid>
          <Grid item xs={12} sm={4} style={{ display: 'flex' }}>
            <TextField
              id='latitude'
              label='Latitude'
              fullWidth
              helperText={textFieldError('latitude')}
              error={!!textFieldError('latitude')}
              value={latitude}
              onChange={change.bind(null, 'latitude')} />
            <InfoIcon onClick={handleInfoClick} style={{ cursor: 'pointer' }} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='facebookUrl'
              label='Facebook Event Page'
              fullWidth
              helperText={textFieldError('facebookUrl')}
              error={!!textFieldError('facebookUrl')}
              value={facebookUrl}
              onChange={change.bind(null, 'facebookUrl')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='imageUrl'
              label='Image URL'
              fullWidth
              helperText={textFieldError('imageUrl')}
              error={!!textFieldError('imageUrl')}
              value={imageUrl}
              onChange={change.bind(null, 'imageUrl')}
            />
          </Grid>
        </Grid>
        <br />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          disabled={!dirty || isSubmitting}
        >
                    Submit
        </Button>
      </form>
    </ThemeProvider>
  )
}
