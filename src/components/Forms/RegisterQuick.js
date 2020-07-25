import React from 'react'
import { Button, TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { COLOR } from '../../constants/Constants'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: COLOR.FONT_COLOR
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: COLOR.FONT_COLOR
      },
      '&:hover fieldset': {
        borderColor: COLOR.FONT_COLOR
      },
      '&.Mui-focused fieldset': {
        borderColor: COLOR.FONT_COLOR
      }
    },
    height: '40px'
  },
  button: {
    backgroundColor: COLOR.BIZTECH_GREEN,
    fontWeight: 'bold'
  }
}))

export default function RegisterEventForm (props) {
  const classes = useStyles()

  const {
    initialValues,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldTouched,
    isSubmitting,
    setFieldValue,
    isUBCStudent
  } = props

  const change = (name, e) => {
    e.persist()
    handleChange(e)
    setFieldTouched(name, true, false)
  }

  const autoCompleteChange = (name, value) => {
    setFieldValue(name, value, false)
    setFieldTouched(name, true, false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='caption' color={'error'}>* Indicates required field</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            className={classes.root}
            variant='outlined'
            label='First Name*'
            autoComplete='given-name'
            helperText={touched.fname ? errors.fname : ''}
            error={touched.fname && Boolean(errors.fname)}
            id='fname'
            onChange={change.bind(null, 'fname')}
            defaultValue={initialValues.fname}
            margin='dense'
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className={classes.root}
            variant='outlined'
            label='Last Name*'
            autoComplete='family-name'
            helperText={touched.lname ? errors.lname : ''}
            error={touched.lname && Boolean(errors.lname)}
            id='lname'
            onChange={change.bind(null, 'lname')}
            defaultValue={initialValues.lname}
            margin='dense'
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className={classes.root}
            variant='outlined'
            label='Email Address*'
            autoComplete='email'
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            id='email'
            onChange={change.bind(null, 'email')}
            defaultValue={initialValues.email}
            margin='dense'
            fullWidth
          />
        </Grid>

        {console.log(isUBCStudent)}

        {isUBCStudent && <Grid item xs={12}>
          <TextField
            className={classes.root}
            variant='outlined'
            label='Student Number*'
            helperText={touched.id ? errors.id : ''}
            error={touched.id && Boolean(errors.id)}
            id='id'
            onChange={change.bind(null, 'id')}
            defaultValue={initialValues.id}
            margin='dense'
            fullWidth
          />
        </Grid>}

        {isUBCStudent && <Grid item xs={12}>
          <Autocomplete
            defaultValue={initialValues.faculty}
            onChange={(e, value) => { autoCompleteChange('faculty', value) }}
            handleHomeEndKeys
            freeSolo
            onInputChange={(e, value) => { setFieldValue('faculty', value, false) }}
            options={['Science', 'Commerce', 'Arts', 'Engineering', 'Kinesiology', 'Land and Food Systems', 'Forestry']}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.root}
                variant='outlined'
                label='Faculty*'
                helperText={touched.faculty ? errors.faculty : ''}
                error={touched.faculty && Boolean(errors.faculty)}
                id='faculty'
                margin='dense'
                fullWidth
              />
            )}
          />
        </Grid>}

        {isUBCStudent && <Grid item xs={12}>
          <Autocomplete
            defaultValue={initialValues.year}
            onChange={(e, value) => { autoCompleteChange('year', value) }}
            handleHomeEndKeys
            freeSolo
            onInputChange={(e, value) => { setFieldValue('year', value, false) }}
            options={['1st Year', '2nd Year', '3rd Year', '4th Year', '5+ Year']}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.root}
                variant='outlined'
                label='Level of study*'
                helperText={touched.year ? errors.year : ''}
                error={touched.year && Boolean(errors.year)}
                id='year'
                margin='dense'
                fullWidth
              />
            )}
          />
        </Grid>}

        <Grid item xs={12}>
          <Autocomplete
            defaultValue={initialValues.diet}
            onChange={(e, value) => { autoCompleteChange('diet', value) }}
            handleHomeEndKeys
            freeSolo
            onInputChange={(e, value) => { setFieldValue('diet', value, false) }}
            options={['None', 'Vegetarian', 'Vegan', 'Gluten Free']}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.root}
                variant='outlined'
                label='Dietary restrictions*'
                helperText={touched.diet ? errors.diet : ''}
                error={touched.diet && Boolean(errors.diet)}
                id='diet'
                margin='dense'
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            defaultValue={initialValues.gender}
            onChange={(e, value) => { autoCompleteChange('gender', value) }}
            handleHomeEndKeys
            freeSolo
            onInputChange={(e, value) => { setFieldValue('gender', value, false) }}
            options={['He/Him/His', 'She/Her/Hers', 'They/Them/Their', 'Prefer not to say']}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.root}
                variant='outlined'
                label='Preferred Pronouns'
                helperText={touched.gender ? errors.gender : ''}
                error={touched.gender && Boolean(errors.gender)}
                id='gender'
                onChange={change.bind(null, 'gender')}
                margin='dense'
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            defaultValue={initialValues.heardFrom}
            onChange={(e, value) => { autoCompleteChange('heardFrom', value) }}
            handleHomeEndKeys
            freeSolo
            onInputChange={(e, value) => { setFieldValue('heardFrom', value, false) }}
            options={['Facebook', 'Boothing', 'Friends', 'BizTech Newsletter', 'Faculty Newsletter']}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.root}
                variant='outlined'
                label='How did you hear about this event?'
                helperText={touched.heardFrom ? errors.heardFrom : ''}
                error={touched.heardFrom && Boolean(errors.heardFrom)}
                id='heardFrom'
                onChange={change.bind(null, 'heardFrom')}
                margin='dense'
                fullWidth
              />
            )}
          />
        </Grid>

      </Grid>
      <br />
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        type='submit'
        disabled={isSubmitting}
      >
                Submit
      </Button>
    </form>
  )
}
