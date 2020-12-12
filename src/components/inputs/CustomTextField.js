import React from 'react'
import {
  Typography,
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { COLORS } from '../../constants/_constants/theme'

const useStyles = makeStyles(() => ({
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
  input: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 1000px ${COLORS.TEXTFIELD} inset`,
      WebkitTextFillColor: COLORS.WHITE,
      caretColor: COLORS.WHITE,
      backgroundColor: COLORS.TEXTFIELD,
      borderRadius: '4px'
    }
  }
}))

export default function CustomTextField (props) {
  const classes = useStyles()

  const {
    errors,
    touched,
    handleChange,
    setFieldTouched,
    groupName,
    label,
    autoComplete
  } = props

  const change = (name, e) => {
    e.persist()
    handleChange(e)
    setFieldTouched(name, true, false)
  }

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
          },
          className: classes.input
        }}
      />
    </React.Fragment>
  )
}
