import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Markdown from 'components/layout/Markdown'

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

const EventView = ({ event, children }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <img src={event.imageUrl || require('assets/placeholder.jpg')} alt='Event' style={{ maxWidth: '100%' }} />

      <div className={classes.content}>
        <Typography variant='h4' align='center' gutterBottom>
          {event.ename}
        </Typography>

        <Markdown>
          {event.description}
        </Markdown>
        {children}
      </div>
    </React.Fragment>
  )
}

export default EventView
