import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { setEvent } from "../actions/PageActions";
import EventFormWrapper from '../components/EventForm/EventFormWrapper';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

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
  },
  content: {
    padding: theme.spacing(3),
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

    if (false) {
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
                    <Skeleton animation="wave" variant="rect" width={'100%'} height={320} />
                    <div className={classes.content}>

                        <Grid container spacing={3}>

                            <Grid item xs={12}>
                                <Skeleton animation="wave" variant="rect" width={300} height={30} />
                            </Grid>

                            {[1, 2, 3].map((e) =>
                            <Grid item container spacing={1} key={e}> 
                                <Grid item xs={12}>
                                    <Skeleton animation="wave" variant="rect" width={130} height={20} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Skeleton animation="wave" variant="rect" width={'100%'} height={20} />
                                </Grid>
                            </Grid>)
                            }
                            
                            <Grid item xs={12}>
                                <Skeleton animation="wave" variant="rect" width={90} height={36} />
                            </Grid>

                        </Grid>
                    </div>
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
