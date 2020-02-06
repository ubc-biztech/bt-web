import React, { Component } from 'react'
import { setEvent } from "../actions/PageActions";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = ({
  root: {
    maxWidth: 350,
    margin: 15,
  },
});

class EventSelector extends Component {

  createEventCards() {
    const { classes } = this.props;

    if (this.props.events)
    return <div>
    {this.props.events.map(event => {
      console.log(event.imageUrl)
      return (
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            component="img"
            image={event.imageUrl}
            title="Event photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {event.ename}
            </Typography>
          </CardContent>
      </Card>
      )
    })}
    </div>
  }

  handleChange(event) {
    // eslint-disable-next-line
    if (event.target.value != -1) {
      this.props.setEvent(this.state.events[event.target.value])
    }
  }

  render() {
    let events = this.props.events;

    if (events === null) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
    else {
      return (
        <div>
          <h1>Events</h1>
          {this.createEventCards()}
        </div>
      );
    }
  }
}

export default connect(null, { setEvent })(withStyles(styles)(EventSelector));
