import React, { Component } from 'react'
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

const styles = ({
  root: {
    width: '31%',
    margin: '10px',
  },
  media: {
    height: 250
  }
});

class Home extends Component {

  createEventCards() {
    const { classes } = this.props;

    if (this.props.events)
      return <Box flexWrap="wrap" display="flex" justifyContent="center">
        {this.props.events.map(event => {
          const image = event.imageUrl || require("../assets/placeholder.jpg")
          return (
            <Card className={classes.root}>
              <CardActionArea onClick={() => {
                this.props.history.push("/event?id=" + event.id)
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
                      console.log('Todo add delete event and edit event buttons')
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

  // handleChange(event) {
  //   // eslint-disable-next-line
  //   if (event.target.value != -1) {
  //     this.props.setEvent(this.state.events[event.target.value])
  //   }
  // }

  render() {
    let events = this.props.events;

    if (events === null) {
      return (
        <CircularProgress />
      )
    }
    else {
      return (
        <React.Fragment>
          <h1>Home</h1>
          {this.createEventCards()}
        </React.Fragment>
      );
    }
  }
}

export default connect(null, { setEvent })(withStyles(styles)(withRouter(Home)));
