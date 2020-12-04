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
  }
}))

const greenStyle = {
  color: COLORS.BIZTECH_GREEN
}

const EventView = ({ event, children }) => {
  const classes = useStyles()
  const [showDescription, setShowDescription] = useState(false)

  return (
    <React.Fragment>
      <img src={event.imageUrl || require('assets/placeholder.jpg')} alt='Event' style={{ maxWidth: '100%' }} />

      <div className={classes.content}>
        <Typography variant='h4' align='left' gutterBottom>
          {event.ename}
        </Typography>

        <div style={{ display: 'flex', cursor: 'pointer' }} onClick={() => setShowDescription(!showDescription)}>
          {showDescription ? <ArrowDropDown style={greenStyle} /> : <ArrowRight style={greenStyle} />}
          <Typography variant='h5'>Info</Typography>
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
