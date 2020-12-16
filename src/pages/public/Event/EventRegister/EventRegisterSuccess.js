import React from 'react'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import LinkIcon from '@material-ui/icons/Link'
import FacebookIcon from '@material-ui/icons/Facebook'
import Discord from '../../../../components/icons/discord.svg'

import { COLORS } from '../../../../constants/_constants/theme'

const ICON_SIZE = '24px';

const useStyles = makeStyles(theme => ({
  successMsgContainer: {
    marginTop: '35px',
    paddingLeft: '19px',
    marginLeft: '11px'
  },
  successMsgHeading: {
    fontWeight: 'bold',
    fontSize: '24px'
  },
  whereToNextContainer: { 
    borderLeft: `2px solid ${COLORS.BIZTECH_GREEN}`,
    marginTop: '35px',
    paddingLeft: '19px',
    marginLeft: '11px'
  },
  whereToNextHeading: {
    fontWeight: 'bold',
    fontSize: '24px'
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginLeft: '5px',
    verticalAlign: 'text-bottom',
  },
  linkIcon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginLeft: '5px',
    verticalAlign: 'text-bottom',
    '&:hover': {
      transform: 'rotate(-20deg)'
    }
  }
}))

const EventRegisterSuccess = ({email, location}) => {
    const classes = useStyles();

    console.log(location.pathname);

    return (
        <React.Fragment>
            <div className={classes.successMsgContainer}>
                <Typography className={classes.successMsgHeading}>See you soon!</Typography>
                <Typography>You've successfully registered with <b>{email}</b>.</Typography>
                <Typography>We've sent you an email.</Typography>
            </div>
            <div className={classes.whereToNextContainer}>
                <Typography className={classes.whereToNextHeading}>What's next?</Typography>
                <Typography>Share the event with friends! 
                    {/*TODO: Add clipboard icon to copy registration link to user's clipboard when clicked */}
                    <LinkIcon className={classes.linkIcon} 
                      onClick={() => navigator.clipboard.writeText(`https://app.ubcbiztech.com${location.pathname}`)}
                    />
                    <a href='https://www.facebook.com/BizTechUBC/' target='_blank' rel='noopener noreferrer'>
                        <FacebookIcon className={classes.icon} />
                    </a>
                    <a href='https://discord.gg/tP6kbkmK5D' target='_blank' rel='noopener noreferrer'>
                        <img src={Discord} className={classes.icon} alt='Discord' />
                    </a>

                </Typography>
            </div>
        </React.Fragment>
    )

}

export default withRouter(EventRegisterSuccess)