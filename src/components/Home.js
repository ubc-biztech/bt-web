import React from 'react'
import { setEvent } from "../actions/PageActions";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { withRouter } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThemeProvider from './ThemeProvider'
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fetchBackend } from '../utils'

const styles = ({
  card: {
    width: '30%',
    margin: '15px 30px 15px 0',
  },
  media: {
    height: 250
  },
});

function Home(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [eventMenuClicked, setEventMenuClicked] = React.useState(null);

  const handleClick = (e, event) => {
    setAnchorEl(e.currentTarget);
    setEventMenuClicked(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickEditEvent = () => {
    const clickedEvent = props.events.find(event => event.id === eventMenuClicked)
    props.setEvent(clickedEvent)
    props.history.push({ pathname: "/edit-event" });
    handleClose()
  };

  const handleClickDeleteEvent = () => {
    const clickedEvent = props.events.find(event => event.id === eventMenuClicked)
    alert(`Are you sure you want to delete ${clickedEvent.ename}? This cannot be undone`)
    fetchBackend(`/events/delete?id=${clickedEvent.id}`, 'DELETE')
      .then(response => response.json())
      .then(response => {
        console.log(response)
        alert(response.message)
        window.location.href = "/";
      })
      .catch(err => {
          console.log(err)
          alert(err.message + ' Please contact a dev')
      })
    handleClose()
  };

  const handleClickViewEvent = () => {
    props.history.push("/page?id=" + eventMenuClicked);
    handleClose()
  };

  function createEventCards() {
    const { classes } = props;

    if (props.events)
      return <Box flexWrap="wrap" display="flex">
        {props.events.map(event => {
          const image = event.imageUrl || require("../assets/placeholder.jpg")
          return (
            <Card className={classes.card} key={event.id}>
              <CardActionArea onClick={() => {
                props.history.push("/event?id=" + event.id)
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
                  <IconButton aria-label="more options"
                    onClick={e => {
                      handleClick(e, event.id)
                    }}>
                    <MoreVertIcon />
                  </IconButton>
                }>
              </CardHeader>
            </Card >
          )
        })
        }
      </Box >
  }

  let events = props.events;

  if (events === null) {
    return (
      <CircularProgress />
    )
  }
  else {
    return (
      <ThemeProvider>
        <Typography variant="h1">BizTech Admins</Typography>
        {createEventCards()}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClickEditEvent}>Edit Event</MenuItem>
          <MenuItem onClick={handleClickDeleteEvent}>Delete Event</MenuItem>
          <MenuItem onClick={handleClickViewEvent}>View Event</MenuItem>
        </Menu>
      </ThemeProvider>
    );
  }
}

export default connect(null, { setEvent })(withStyles(styles)(withRouter(Home)));
