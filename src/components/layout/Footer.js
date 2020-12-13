import React from 'react'
import Heart from '../../assets/heart.svg'
import { COLORS } from '../../constants/_constants/theme'

import IconContainer from './IconContainer'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const ICON_SIZE = '24px'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    width: '100%'
  },
  careContainer: {
    display: 'flex'
  },
  iconContainer: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: '70px'
  },
  careText: {
    color: COLORS.FONT_GRAY,
    fontSize: '14px'
  },
  heart: {
    height: '15px',
    width: '15px',
    marginTop: '3px',
    marginLeft: '5px'
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    margin: '5px'
  }
}))

function Header () {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.careContainer}>
        <Typography className={classes.careText}>Made with care</Typography>
        <img src={Heart} className={classes.heart} alt='Love' />
      </div>
      <IconContainer/>
    </div>
  )
}

export default Header
