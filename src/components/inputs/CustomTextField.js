import React from 'react'
import { COLORS } from '../../constants/_constants/theme'

import { Typography, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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
    },
    '& .MuiOutlinedInput-multiline': {
      padding: '0'
    }
  },
  mobileTextField: {
    padding: '10px',
    backgroundColor: COLORS.CARD_PAPER_COLOR,
    borderRadius: '4px',
    '& .MuiInputBase-root': {
      backgroundColor: COLORS.CARD_PAPER_COLOR
    },
    '& .MuiFilledInput-multiline': {
      padding: '35px 0'
    }
  },
  input: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 1000px ${COLORS.TEXTFIELD} inset`,
      WebkitTextFillColor: COLORS.WHITE,
      caretColor: COLORS.WHITE,
      backgroundColor: COLORS.TEXTFIELD,
      borderRadius: '0px'
    }
  },
  mobileInput: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 1000px ${COLORS.CARD_PAPER_COLOR} inset`,
      WebkitTextFillColor: COLORS.WHITE,
      caretColor: COLORS.WHITE,
      backgroundColor: `${COLORS.CARD_PAPER_COLOR} !important`,
      borderRadius: '0px'
    }
  }
}))

export default function CustomTextField (props) {
  const classes = useStyles()
  const theme = useTheme()
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    errors,
    touched,
    handleChange,
    setFieldTouched,
    groupName,
    label,
    autoComplete,
    multiline,
    rows,
    type,
    initialValues
  } = props

  const change = (name, e) => {
    e.persist()
    handleChange(e)
    setFieldTouched(name, true, false)
  }

  function createTextField (className, variant, inputProps, label) {
    return (
      <TextField
        label={label}
        type={type || ''}
        margin='none'
        className={className}
        autoComplete={autoComplete}
        helperText={touched[groupName] ? errors[groupName] : ''}
        error={touched[groupName] && Boolean(errors[groupName])}
        id={groupName}
        onChange={change.bind(null, groupName)}
        fullWidth
        variant={variant}
        inputProps={inputProps}
        InputLabelProps={{
          shrink: true
        }}
        multiline={multiline}
        rows={rows}
        value={initialValues[groupName]}
      />
    )
  }

  return (
    <React.Fragment>
      {!renderMobileOnly && <Typography>{label}</Typography>}
      {renderMobileOnly
        ? createTextField(
          classes.mobileTextField,
          'filled',
          {
            style: {
              padding: '7px',
              backgroundColor: COLORS.CARD_PAPER_COLOR,
              marginTop: '10px'
            },
            className: classes.mobileInput
          },
          label
        )
        : createTextField(classes.textField, 'outlined', {
          style: {
            padding: '7px'
          },
          className: classes.input
        })}
    </React.Fragment>
  )
}
