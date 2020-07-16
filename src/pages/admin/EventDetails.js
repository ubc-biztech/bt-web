import React, { useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import CircularProgress from "@material-ui/core/CircularProgress";
import ThemeProvider from "../../components/ThemeProvider";
import { updateEvents, updateRegistrations } from "../../utils";
import EventDescription from "../../components/EventDescription";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  content: {
    padding: "80px 10px 0px 10px"
  },
  returnDiv: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  },
  returnText: {
    fontSize: "24px",
    paddingLeft: "15px"
  },
  backArrowIcon: {
    fontSize: "32px"
  },
}));

const EventDetails = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { id: eventId } = useParams();
  const { user, events, registrations} = props;
  console.log('all props: ', props);
  if (!events) {
    updateEvents();
  }
  if (!registrations) {
    updateRegistrations();
  }
  const [event, setEvent] = useState(null);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    if (events && eventId) {
      setEvent(events.find(event => event.id === eventId));
    }
    if (registrations && eventId) {
      setRegistration(registrations.find(registration => registration.eventID === eventId));
    }
  }, [event, events, setEvent, registration, registrations, setRegistration, eventId]);

  const handleClickReturnEvent = event => {
    history.push("/events");
  };


  return event ? (
    <ThemeProvider>
      <Helmet>
        <title>{event.ename} - BizTech Members</title>
      </Helmet>
      <div className={classes.returnDiv}>
        <ArrowBackIcon
          className={classes.backArrowIcon}
          onClick={handleClickReturnEvent}
        ></ArrowBackIcon>
        <Typography className={classes.returnText}>All Events</Typography>
      </div>
      <EventDescription event={event} user={user} registration={registration}></EventDescription>
    </ThemeProvider>
  ) : (
    <CircularProgress />
  );
}

const mapStateToProps = state => {
  return {
    events: state.pageState.events
  };
};

export default connect(
  mapStateToProps,
  {}
)(withRouter(EventDetails));
