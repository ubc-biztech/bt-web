import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { setEvent } from "../actions/PageActions";
import EventFormWrapper from '../components/EventForm/EventFormWrapper';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const queryString = require('query-string');

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up('sm')]: {
      width: 600,
      margin: 'auto',
    },
  },
  paper: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(3),
    },
  }
}));

const EventPage = (props) => {
    const classes = useStyles();
    const { event } = props;

    useEffect(() => {
        const params = queryString.parse(window.location.search);
        const eventID = params.id;
        if (eventID) {
            const events = props.events
            if (events) {
                props.setEvent(events.find(event => event.id === params.id))
            }
        }
    }, [props])

    if (event) {
        return (
            <div className={classes.layout}>
                <Paper className={classes.paper}>
                    <EventFormWrapper event={event} />
                </Paper>
            </div>
        )
    } else {
        return (
            <div className={classes.layout}>
                <Paper className={classes.paper}>
                    <p>hi</p>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.pageState.events,
        event: state.pageState.event
    };
};

export default connect(mapStateToProps, { setEvent })(EventPage);
