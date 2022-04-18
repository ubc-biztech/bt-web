import React from 'react'
import { COLORS } from '../../constants/_constants/theme'

import { Typography, MenuItem, Select, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
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
  },
  mobileContainer: {
    padding: '10px',
    backgroundColor: COLORS.CARD_PAPER_COLOR,
    borderRadius: '4px'
  },
  menuItem: {
    [theme.breakpoints.down('sm')]: {
      overflowX: 'scroll'
    }
  }
}))

export default function CustomSelect (props) {
  const classes = useStyles()
  const theme = useTheme()
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
    groupName,
    label,
    listOfOptions,
    initialValues
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
    <div className={renderMobileOnly ? classes.mobileContainer : undefined}>
      <Typography>{label}</Typography>
      <Select
        className={
          touched[groupName] && Boolean(errors[groupName])
            ? classes.errorSelect
            : classes.select
        }
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
        onClick={(e) => {
          handleSelectChange(e, groupName)
        }}
        value={initialValues[groupName]}
      >
        {listOfOptions.map((option) => (
          <MenuItem key={option} value={option} className={classes.menuItem}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {touched[groupName] && Boolean(errors[groupName]) ? (
        <FormHelperText className={classes.errorMsg}>
          This is required!
        </FormHelperText>
      ) : null}
    </div>
  )
}
