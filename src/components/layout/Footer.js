import React from 'react'
import Heart from '../../assets/heart.svg'
import BiztechIcon from '../icons/BiztechIcon'
import Discord from '../icons/discord.svg'
import { COLORS } from '../../constants/_constants/theme'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

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
      <div className={classes.iconContainer}>
        <a href='https://www.ubcbiztech.com' target='_blank' rel='noopener noreferrer'>
          <BiztechIcon fill={COLORS.WHITE} size={ICON_SIZE} margin='5px' />
        </a>
        <a href='https://www.linkedin.com/company/ubcbiztech/' target='_blank' rel='noopener noreferrer'>
          <LinkedInIcon className={classes.icon} />
        </a>
        <a href='https://discord.gg/tP6kbkmK5D' target='_blank' rel='noopener noreferrer'>
          <img src={Discord} className={classes.icon} alt='Discord' />
        </a>
        <a href='https://www.facebook.com/BizTechUBC/' target='_blank' rel='noopener noreferrer'>
          <FacebookIcon className={classes.icon} />
        </a>
        <a href='https://www.instagram.com/ubcbiztech/' target='_blank' rel='noopener noreferrer'>
          <InstagramIcon className={classes.icon} />
        </a>
      </div>
    </div>
  )
}

export default Header
