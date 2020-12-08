import React from 'react'
import {
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormHelperText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { COLORS } from '../../../../constants/_constants/theme'

const useStyles = makeStyles((theme) => ({
  textField: {
    '& label.Mui-focused': {
      color: COLORS.TEXTFIELD
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: COLORS.TEXTFIELD,
      borderRadius: '4px',
      '& fieldset': {
        borderColor: COLORS.TEXTFIELD
      },
      '&:hover fieldset': {
        borderColor: COLORS.TEXTFIELD
      },
      '&.Mui-focused fieldset': {
        borderColor: COLORS.TEXTFIELD
      }
    }
  },
  gridContainer: {
    marginTop: '5px'
  },
  select: {
    backgroundColor: COLORS.TEXTFIELD,
    borderRadius: '4px',
    marginBottom: '20px',
    paddingLeft: '10px'
  },
  icon: {
    fill: COLORS.BIZTECH_GREEN
  },
  errorMsg: {
    color: '#d8362d'
  }
}))

export default function RegisterEventForm (props) {
  const classes = useStyles()

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldTouched,
    dirty,
    isSubmitting,
    setFieldValue
  } = props

  const change = (name, e) => {
    e.persist()
    handleChange(e)
    setFieldTouched(name, true, false)
  }

  const handleSelectChange = (e, groupName) => {
    e.preventDefault()
    const value = e.target.value
    console.log('values')
    console.log(values)
    console.log('errors')
    console.log(errors)
    console.log('touched')
    console.log(touched)

    setFieldTouched(groupName, true, false)
    setFieldValue(groupName, value)
  }

  function createTextField (label, groupName, autoComplete) {
    return (
      <React.Fragment>
        <Typography>{label}</Typography>
        <TextField
          className={classes.textField}
          margin='none'
          autoComplete={autoComplete}
          helperText={touched[groupName] ? errors[groupName] : ''}
          error={touched[groupName] && Boolean(errors[groupName])}
          id={groupName}
          onChange={change.bind(null, groupName)}
          fullWidth
          variant='outlined'
          inputProps={{
            style: {
              padding: '7px'
            }
          }}
        />
      </React.Fragment>
    )
  }

  function createSelect (label, listOfOptions, groupName) {
    return (
      <React.Fragment>
        <Typography>{label}</Typography>
        <Select
          className={classes.select}
          disableUnderline={true}
          MenuProps={{
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            }
          }}
          inputProps={{
            classes: {
              icon: classes.icon
            }
          }}
          fullWidth
          defaultValue=''
          onClick={(e) => { handleSelectChange(e, groupName) }}
        >
          {listOfOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
        </Select>
        {touched[groupName] && Boolean(errors[groupName]) ? <FormHelperText className={classes.errorMsg}>This is required!</FormHelperText> : null}
      </React.Fragment>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='caption' color={'error'}>* Indicates required field</Typography>
      <Grid className={classes.gridContainer} container spacing={3}>
        <Grid item xs={12}>
          {createTextField('First Name *', 'fname', 'given-name')}
        </Grid>

        <Grid item xs={12}>
          {createTextField('Last Name *', 'lname', 'family-name')}
        </Grid>

        <Grid item xs={12}>
          {createTextField('Email Address *', 'email', 'email')}
        </Grid>

        <Grid item xs={12}>
          {createTextField('Student Number *', 'id', 'id')}
        </Grid>

        <Grid item xs={4}>
          <Grid item xs={12}>
            {createSelect(
              'Faculty * ',
              ['Arts', 'Commerce', 'Science', 'Engineering', 'Kinesiology', 'Land and Food Systems', 'Forestry'],
              'faculty'
            )}
          </Grid>

          <Grid item xs={12}>
            {createSelect(
              'Level of study *',
              ['1st Year', '2nd Year', '3rd Year', '4th Year', '5+ Year'],
              'year'
            )}
          </Grid>

          <Grid item xs={12}>
            {createSelect(
              'Preferred Pronouns',
              ['He/Him/His', 'She/Her/Hers', 'They/Them/Their', 'Prefer not to say'],
              'gender'
            )}
          </Grid>

          <Grid item xs={12}>
            {createSelect(
              'How did you hear about this event?',
              ['Facebook', 'Boothing', 'Friends', 'BizTech Newsletter', 'Faculty Newsletter'],
              'heardFrom'
            )}
          </Grid>
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
  )
}
