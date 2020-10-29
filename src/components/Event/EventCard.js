import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import {
  Star,
  StarBorder
} from '@material-ui/icons'

import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const styles = ({
  card: {
    width: '30%',
    margin: '15px 30px 15px 0'
  },
  media: {
    height: 250
  },
  favouriteButton: {
    cursor: 'pointer'
  }
})

function EventCard (props) {
  const {
    classes,
    cardStyle = {},
    event,
    favourited = false,
    handleCardClick,
    handleSubMenuClick = () => {},
    handleFavourite = () => {},
    variant = 'admin'
  } = props

  const image = event.imageUrl || require('assets/default.png')

  return (
    <Card className={classes.card} style={cardStyle} key={event.id}>
      <CardActionArea onClick={e => { handleCardClick(e, event.id) }} >
        <CardMedia
          className={classes.media}
          component='img'
          image={image}
          title='Event photo'
        />
      </CardActionArea>
      <CardHeader
        title={event.ename}
        subheader={event.startDate
          ? new Date(event.startDate)
            .toLocaleDateString('en-US', { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric' }) : ''}
        action={
          variant === 'admin' ? (
            <IconButton aria-label='more options'
              onClick={e => { handleSubMenuClick(e, event.id) }}>
              <MoreVertIcon />
            </IconButton>
          ) : (
            favourited
              ? <Star fontSize='large' onClick={() => { handleFavourite(event.id, false) }} style={styles.favouriteButton}/>
              : <StarBorder fontSize='large' onClick={() => { handleFavourite(event.id, true) }} style={styles.favouriteButton}/>
          )
        }>
      </CardHeader>
    </Card >
  )
}

export default withStyles(styles)(EventCard)
