import React from 'react'
import {
  Typography,
  MenuItem,
  Select,
  FormHelperText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { COLORS } from '../../constants/_constants/theme'

const useStyles = makeStyles(() => ({
  errorSelect: {
    backgroundColor: COLORS.TEXTFIELD,
    borderRadius: '4px',
    paddingLeft: '10px',
    border: `1px solid ${COLORS.ERROR_RED}`
  },
  select: {
    backgroundColor: COLORS.TEXTFIELD,
    borderRadius: '4px',
    paddingLeft: '10px'
  },
  errorMsg: {
    color: COLORS.ERROR_RED
  },
  icon: {
    fill: COLORS.BIZTECH_GREEN
  }
}))

export default function CustomSelect (props) {
  const classes = useStyles()

  const {
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
    groupName,
    label,
    listOfOptions
  } = props

  const handleSelectChange = (e, groupName) => {
    e.preventDefault()
    const value = e.target.value

    if (value) {
      setFieldTouched(groupName, true, false)
      setFieldValue(groupName, value)
    }
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography>{label}</Typography>
      <Select
        className={touched[groupName] && Boolean(errors[groupName]) ? classes.errorSelect : classes.select}
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
    </div>
  )
}
