import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Markdown from 'components/layout/Markdown'
import ArrowRight from '@material-ui/icons/ArrowRight'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'

import { COLORS } from '../../constants/_constants/theme'

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up('sm')]: {
      width: 600,
      margin: 'auto'
    }
  },
  paper: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(3)
    }
  },
  content: {
    padding: theme.spacing(3)
  },
  arrowStyle: {
    color: COLORS.BIZTECH_GREEN,
    fontSize: '36px'
  },
  dropDown: {
    display: 'flex',
    cursor: 'pointer',
    marginLeft: '-6px'
  },
  infoText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}))

const EventView = ({ event, children }) => {
  const classes = useStyles()
  const [showDescription, setShowDescription] = useState(false)

  return (
    <React.Fragment>
      <img src={event.imageUrl || require('assets/placeholder.jpg')} alt='Event' style={{ maxWidth: '100%', borderRadius: '5px' }} />

      <div className={classes.content}>
        <Typography variant='h4' align='left' gutterBottom>
          {event.ename}
        </Typography>

        <div className={classes.dropDown} onClick={() => setShowDescription(!showDescription)}>
          {showDescription ? <ArrowDropDown className={classes.arrowStyle} /> : <ArrowRight className={classes.arrowStyle} />}
          <Typography className={classes.infoText} variant='h5'>Info</Typography>
        </div>

        {showDescription ? (
          <Markdown>
            {event.description}
          </Markdown>
        ) : (
          <div />
        )}
        {children}
      </div>
    </React.Fragment>
  )
}

export default EventView
