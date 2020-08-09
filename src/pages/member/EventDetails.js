import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import CircularProgress from "@material-ui/core/CircularProgress";
import { updateEvents, updateRegistrations } from "../../utils";
import EventDescription from "../../components/EventDescription";
import QuickRegister from "./QuickRegister";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import { REGISTRATION_STATUS } from "../../constants/Constants";

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up("sm")]: {
      width: "66vw",
      margin: "auto"
    }
  },
  returnDiv: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    width: "66vw"
  },
  returnText: {
    fontSize: "24px",
    paddingLeft: "15px"
  },
  backArrowIcon: {
    fontSize: "32px"
  }
}));

const EventDetails = props => {
  const classes = useStyles();
  const history = useHistory();
  const { id: eventId } = useParams();
  const { user, events, registrations } = props;
  if (!events) {
    updateEvents();
  }
  if (!registrations) {
    updateRegistrations();
  }
  const [event, setEvent] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [isRegisterBtnClicked, setIsRegisterBtnClicked] = useState(false);
  const [eventRegistrationStatus, setEventRegistrationStatus] = useState(false);

  useEffect(() => {
    if (events && eventId) {
      setEvent(events.find(event => event.id === eventId));
    }
    if (registrations && eventId) {
      setRegistration(
        registrations.find(registration => registration.eventID === eventId)
      );
    }
    if (
      registration &&
      registration.registrationStatus === REGISTRATION_STATUS.REGISTERED
    ) {
      console.log('set to true');
      setEventRegistrationStatus(true);
    }
  }, [
    event,
    events,
    setEvent,
    registration,
    registrations,
    setRegistration,
    setEventRegistrationStatus,
    eventId
  ]);

  const handleReturnClicked = () => {
    history.push("/events");
  };

  //change isRegister when 'sign me up' button is clicked
  //for conditionally rendering EventDescription OR QuickRegister Page
  const handleRegisterClickedCallback = (registerBtnClicked) => {
    setIsRegisterBtnClicked(registerBtnClicked);
  };

  //change registerState when current event is registered/unregistered
  //for conditionally rendering the registration status UI on BOTH EventDescription AND QuickRegister page
  const handleRegisterStateChangedCallback = (registered) => {
    console.log("handleRegisterStateChangedCallback");
    console.log('registered:', registered);
    setEventRegistrationStatus(registered);
    console.log('eventRegistrationStatus:', eventRegistrationStatus);
  }

  return event ? (
    <React.Fragment>
      <Helmet>
        <title>{event.ename} - BizTech Members</title>
      </Helmet>
      <div className={classes.layout}>
        <div className={classes.returnDiv}>
          <ArrowBackIcon
            className={classes.backArrowIcon}
            onClick={handleReturnClicked}
          ></ArrowBackIcon>
          <Typography className={classes.returnText}>All Events</Typography>
        </div>
        {isRegisterBtnClicked ? (
          <QuickRegister 
            event={event}
            user={user}
            registration={registration}
            eventRegistrationStatus={eventRegistrationStatus}
            handleRegisterStateChangedCallback={handleRegisterStateChangedCallback}
            handleRegisterClickedCallback={handleRegisterClickedCallback}
          />
        ) : (
          <EventDescription
            event={event}
            user={user}
            registration={registration}
            eventRegistrationStatus={eventRegistrationStatus}
            handleRegisterStateChangedCallback={handleRegisterStateChangedCallback}
            handleRegisterClickedCallback={handleRegisterClickedCallback}
          />
        )}
      </div>
    </React.Fragment>
  ) : (
    <CircularProgress />
  );
};

const mapStateToProps = state => {
  return {
    events: state.pageState.events
  };
};

export default connect(
  mapStateToProps,
  {}
)(withRouter(EventDetails));
