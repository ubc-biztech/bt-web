import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import LinkIcon from '@material-ui/icons/Link'
import FacebookIcon from '@material-ui/icons/Facebook'
import Discord from '../../../../components/icons/discord.svg'

import { COLORS } from '../../../../constants/_constants/theme'

const ICON_SIZE = '24px';
const FLASH_TIME = '50';

const useStyles = makeStyles(theme => ({
  successMessageContainer: {
    marginTop: '35px',
    paddingLeft: '19px',
    marginLeft: '13px'
  },
  successMessageHeading: {
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
    verticalAlign: 'bottom',
  },
  linkIcon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginLeft: '5px',
    verticalAlign: 'bottom',
    '&:hover': {
      transform: 'rotate(-20deg)',
      cursor: 'pointer',
    },
    '&:active': {
      transform: 'rotate(-90deg)'
    },
  },
  linkCopiedMessage: {
    color: `${COLORS.LIGHT_YELLOW}`,
    paddingLeft: '19px',
    marginLeft: '13px'
  },
  linkCopiedMessageHidden: {
    color: `${COLORS.LIGHT_YELLOW}`,
    paddingLeft: '19px',
    marginLeft: '13px',
    visibility: 'hidden'
  }
}))

const EventRegisterSuccess = ({email, location}) => {
    const classes = useStyles();

    const [displayLinkMessage, setDisplayLinkMessage] = useState(false);

    let blinkingTimer = undefined;

    const copyLinkToClipboard = () => {
      navigator.clipboard.writeText(`https://app.ubcbiztech.com${location.pathname}`);
      if(blinkingTimer) clearTimeout(blinkingTimer);

      //Create blinking effect, for better UX experience
      setDisplayLinkMessage(false); 
      blinkingTimer = setTimeout(() => setDisplayLinkMessage(true), FLASH_TIME);
    }

    return (
        <React.Fragment>
            <div className={classes.successMessageContainer}>
                <Typography className={classes.successMessageHeading}>See you soon!</Typography>
                <Typography>You've successfully registered with <b>{email}</b>.</Typography>
                <Typography>We've sent you an email.</Typography>
            </div>
            <div className={classes.whereToNextContainer}>
                <Typography className={classes.whereToNextHeading}>What's next?</Typography>
                <Typography>Share the event with friends! 
                    {/*TODO: Add clipboard icon to copy registration link to user's clipboard when clicked */}
                    <LinkIcon className={classes.linkIcon} 
                      onClick={() => copyLinkToClipboard()}
                    />
                    <a href='https://www.facebook.com/BizTechUBC/' target='_blank' rel='noopener noreferrer'>
                        <FacebookIcon className={classes.icon} />
                    </a>
                    <a href='https://discord.gg/tP6kbkmK5D' target='_blank' rel='noopener noreferrer'>
                        <img src={Discord} className={classes.icon} alt='Discord' />
                    </a>

                </Typography>
            </div>
            {displayLinkMessage ?  
                <Typography className={classes.linkCopiedMessage} variant='caption'>
                  Registration Link Copied to Clipboard!</Typography> :
                <Typography className={classes.linkCopiedMessageHidden} variant='caption'>
                  Registration Link Copied to Clipboard!</Typography> 
            } 
        </React.Fragment>
    )

}

export default withRouter(EventRegisterSuccess)