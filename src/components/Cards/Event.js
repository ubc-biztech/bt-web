import React from 'react';
import { useHistory } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import {
    // Star,
    StarBorder
} from '@material-ui/icons';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = ({
    card: {
      width: '30%',
      margin: '15px 30px 15px 0',
    },
    media: {
      height: 250,
    },
    favoriteButton: {
      cursor: 'pointer',
    }
});

function EventCard(props) {

    const {
        classes,
        cardStyle = {},
        event,
        handleClick,
        handleFavorite = () => {},
        variant = "admin"
    } = props;
    const history = useHistory();

    const image = event.imageUrl || require("../../assets/default.png")

    return (
        <Card className={classes.card} style={cardStyle} key={event.id}>
              <CardActionArea onClick={() => {
                history.push(`/event/${event.id}`)
              }} >
                <CardMedia
                  className={classes.media}
                  component="img"
                  image={image}
                  title="Event photo"
                />
              </CardActionArea>
              <CardHeader
                title={event.ename}
                subheader={event.startDate ?
                  new Date(event.startDate)
                    .toLocaleDateString('en-US', { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric' }) : ''}
                action={
                  variant === "admin" ? (
                  <IconButton aria-label="more options"
                    onClick={e => { handleClick(e, event.id) }}>
                    <MoreVertIcon />
                  </IconButton>
                  ) : (
                    // TODO: Check if is a user favorite
                    // <Star fontSize="large" onClick={() => { handleFavorite(event.id) }} style={styles.favoriteButton}/>
                    <StarBorder fontSize="large" onClick={() => { handleFavorite(event.id) }} style={styles.favoriteButton}/>
                  ) 
                }>
              </CardHeader>
            </Card >
    )
}

export default withStyles(styles)(EventCard)