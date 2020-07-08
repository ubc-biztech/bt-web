import React from 'react'
import { Button, TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { COLOR } from '../../constants/Constants'

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
    }
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
    isSubmitting
  } = props

  const change = (name, e) => {
    e.persist()
    handleChange(e)
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

        <Grid item xs={12}>
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
        </Grid>

        <Grid item xs={12}>
          <TextField
            className={classes.root}
            variant='outlined'
            label='Faculty*'
            helperText={touched.faculty ? errors.faculty : ''}
            error={touched.faculty && Boolean(errors.faculty)}
            id='faculty'
            onChange={change.bind(null, 'faculty')}
            defaultValue={initialValues.faculty}
            margin='dense'
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className={classes.root}
            variant='outlined'
            label='Level of study*'
            helperText={touched.year ? errors.year : ''}
            error={touched.year && Boolean(errors.year)}
            id='year'
            onChange={change.bind(null, 'year')}
            defaultValue={initialValues.year}
            margin='dense'
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className={classes.root}
            variant='outlined'
            label='Dietary restrictions*'
            helperText={touched.diet ? errors.diet : ''}
            error={touched.diet && Boolean(errors.diet)}
            id='diet'
            onChange={change.bind(null, 'diet')}
            defaultValue={initialValues.diet}
            margin='dense'
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className={classes.root}
            variant='outlined'
            label='Preferred Pronouns'
            helperText={touched.gender ? errors.gender : ''}
            error={touched.gender && Boolean(errors.gender)}
            id='gender'
            onChange={change.bind(null, 'gender')}
            defaultValue={initialValues.gender}
            margin='dense'
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className={classes.root}
            variant='outlined'
            label='How did you hear about this event?'
            helperText={touched.heardFrom ? errors.heardFrom : ''}
            error={touched.heardFrom && Boolean(errors.heardFrom)}
            id='heardFrom'
            onChange={change.bind(null, 'heardFrom')}
            defaultValue={initialValues.heardFrom}
            margin='dense'
            fullWidth
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
