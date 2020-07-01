import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import { COLOR } from '../../constants/Constants'
import CardContent from '@material-ui/core/CardContent'

const styles = {
  page: {
    width: '345px'
  },
  title: {
    color: COLOR.BIZTECH_GREEN,
    fontWeight: 'bold'
  },
  eventName: {
    fontSize: '24px',
    fontWeight: 'normal'
  },
  eventDate: {
    fontSize: '20px',
    fontWeight: 'normal',
    color: COLOR.FONT_COLOR
  }
}

function EventCard (props) {
  const { classes } = props
  let eventName = ''
  let eventDate = ''
  if (props.event) {
    eventName = props.event.ename
    if (props.event.startDate) {
      eventDate = new Date(props.event.startDate)
        .toLocaleDateString('en-US', { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric' })
    }
  }

  return (
    <Card classes={{ root: classes.page }}>
      <CardContent>
        <Typography variant='h2' style={styles.title}>{props.type}</Typography>
        <Typography style={styles.eventName}>{eventName}</Typography>
        <Typography style={styles.eventDate}>{eventDate}</Typography>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(EventCard)
