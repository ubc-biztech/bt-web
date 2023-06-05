import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import EventDescription from "./EventDescription";
import QuickRegister from "pages/member/Event/QuickRegister";
import Loading from "pages/Loading";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";

import { REGISTRATION_STATUS } from "constants/index";
import { fetchUserRegisteredEvents } from "store/user/userActions";
import { fetchBackend } from "utils";

const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up("sm")]: {
      width: "66vw",
      margin: "auto",
    },
  },
  returnDiv: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    width: "66vw",
  },
  returnText: {
    fontSize: "24px",
    paddingLeft: "15px",
  },
  backArrowIcon: {
    fontSize: "32px",
  },
}));

const EventDetails = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { eventId, event, loading, user, userRegisteredEvents } = props;

  const [registration, setRegistration] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [isRegisterBtnClicked, setIsRegisterBtnClicked] = useState(false);

  useEffect(() => {
    // first, check if the user is logged in
    if (!user.id) return;
    if (!userRegisteredEvents) {
      fetchUserRegisteredEvents({ userId: user.email });
    } else {
      const userRegistrationObject = userRegisteredEvents.find(
        (registration) => registration.eventID === eventId
      );
      setRegistration(userRegistrationObject);
    }
    if (
      registration &&
      registration.registrationStatus === REGISTRATION_STATUS.REGISTERED
    ) {
      setRegistrationStatus(true);
    }
  }, [
    user,
    event,
    registration,
    userRegisteredEvents,
    setRegistration,
    setRegistrationStatus,
    eventId,
  ]);

  const handleReturnClicked = () => {
    history.push("/events");
  };

  // change isRegister when 'sign me up' button is clicked
  // for conditionally rendering EventDescription OR QuickRegister Page
  const handleRegisterClickedCallback = (registerBtnClicked) => {
    setIsRegisterBtnClicked(registerBtnClicked);
  };

  // change registerState when current event is registered/unregistered
  // for conditionally rendering the registration status UI on BOTH EventDescription AND QuickRegister page
  const handleRegisterStateChangedCallback = (registered) => {
    setRegistrationStatus(registered);
  };

  let settingRegistrationData = false;

  const sendRegistrationDataCallback = async (
    id,
    eventID,
    isRegister,
    isFirstTime,
    heardFrom
  ) => {
    if (settingRegistrationData === true) {
      return Promise.resolve("in_progress");
    }
    settingRegistrationData = true;
    let registrationStatus = "";
    let method = "";
    let path = "";
    if (isRegister) {
      registrationStatus = REGISTRATION_STATUS.REGISTERED;
    } else {
      registrationStatus = REGISTRATION_STATUS.CANCELLED;
    }
    const body = {
      eventID,
      registrationStatus,
    };
    if (isFirstTime) {
      body.id = id;
      method = "POST";
      path = "/registrations";
      if (heardFrom) {
        body.heardFrom = heardFrom;
      }
    } else {
      method = "PUT";
      path = `/registrations/${id}`;
    }
    try {
      await fetchBackend(path, method, body);
      settingRegistrationData = false;
      let responesMsg = "";
      isRegister
        ? (responesMsg = "registration")
        : (responesMsg = "unregistration");
      responesMsg += " succeed";
      return Promise.resolve(responesMsg);
    } catch (error) {
      settingRegistrationData = false;
      return Promise.reject(error);
    }
  };
  // Loading state
  if (loading) return <Loading message="Loading event data..." />;
  return (
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
            eventRegistrationStatus={registrationStatus}
            handleRegisterStateChangedCallback={
              handleRegisterStateChangedCallback
            }
            handleRegisterClickedCallback={handleRegisterClickedCallback}
            sendRegistrationDataCallback={sendRegistrationDataCallback}
          />
        ) : (
          <EventDescription
            event={event}
            user={user}
            registration={registration}
            registrationStatus={registrationStatus}
            handleRegisterStateChangedCallback={
              handleRegisterStateChangedCallback
            }
            handleRegisterClickedCallback={handleRegisterClickedCallback}
            sendRegistrationDataCallback={sendRegistrationDataCallback}
          />
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user.data,
  };
};

export default connect(mapStateToProps, {})(EventDetails);
