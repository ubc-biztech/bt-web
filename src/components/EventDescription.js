import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Markdown from "./Markdown";
import Paper from "@material-ui/core/Paper";
import { COLOR } from "../constants/Constants";
import { fetchBackend } from "../utils";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up("sm")]: {
      width: 600,
      margin: "auto"
    }
  },
  paper: {
    maxWidth: "1274px",
    padding: "60px 0 80px 95px",
    position: "relative"
  },

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

  title: {
    display: "inline-block",
    fontSize: "36px"
  },

  description: {
    margin: "50px 0px 67px 0px"
  },

  favLogo: {
    position: "absolute",
    right: "100px"
  },

  viewLogo: {
    position: "absolute",
    right: "150px",
    top: "6px"
  },

  button: {
    marginLeft: "10px"
  },

  buttonGroup: {
    position: "absolute",
    right: "100px"
  }
}));

const handleClickReturnEvent = event => {};

let settingFavouriteData = false;
const sendFavouriteData = async (userID, eventID, isFavourite) => {
  if (settingFavouriteData === true) {
    return Promise.resolve("in_progress");
  }
  settingFavouriteData = true;
  const bodyData = {
    eventID: eventID,
    isFavourite: isFavourite
  };
  try {
    const response = await fetchBackend(
      `/users/favEvent/${userID}`,
      "PATCH",
      bodyData
    );
    settingFavouriteData = false;
    let responesMsg = "";
    isFavourite ? (responesMsg = "favourite") : (responesMsg = "unfavourite");
    responesMsg += " succeed";
    return Promise.resolve(responesMsg);
  } catch (error) {
    settingFavouriteData = false;
    return Promise.reject(error);
  }
};

const sendRegistrationData = async (id, eventID, heardFrom) => {
  const body = {
    id,
    eventID,
    heardFrom,
    registrationStatus: "registered"
  };
  try {
    await fetchBackend("/registrations", "POST", body);
    alert("Signed Up");
  } catch (err) {
    if (err.status === 409) {
      alert("You cannot sign up for this event again!");
    } else {
      alert("Signup failed");
    }
  }
};

const TransitionUp = props => {
  return <Slide {...props} direction="up" />;
};

const EventDescription = ({ user, event, children }) => {
  const classes = useStyles();
  const favLogo = useRef(null);
  const [eventFavStatus, setEventFavStatus] = useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  //called after the first dom mutation
  useLayoutEffect(() => {
    if (event && user && user.favedEventsID) {
      if (user.favedEventsID.indexOf(event.id) !== -1) {
        console.log("set to true");
        setEventFavStatus(true);
      }
    }
  }, [event, user]);

  const handleClickFavouriteEvent = async (userID, eventID) => {
    const currFavStatus = eventFavStatus;
    try {
      const favResult = await sendFavouriteData(
        userID,
        eventID,
        !currFavStatus
      );
      setEventFavStatus(!currFavStatus);
      openSnackBar(favResult);
    } catch (error) {
      console.error(error);
      setSnackMsg(error);
      openSnackBar(error);
    }
  };

  const openSnackBar = msg => {
    setSnackMsg(msg);
    setSnackOpen(true);
    setTimeout(() => {
      setSnackOpen(false);
    }, 1000);
  };

  return (
    <div className={classes.content}>
      <div className={classes.returnDiv}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.845299 11.8453C0.207577 12.483 0.207577 13.517 0.845299 14.1547L11.2376 24.547C11.8753 25.1847 12.9093 25.1847 13.547 24.547C14.1847 23.9093 14.1847 22.8753 13.547 22.2376L4.3094 13L13.547 3.76239C14.1847 3.12467 14.1847 2.09072 13.547 1.45299C12.9093 0.81527 11.8753 0.81527 11.2376 1.45299L0.845299 11.8453ZM26 11.367L2 11.367L2 14.633L26 14.633L26 11.367Z" fill="white"/>
        </svg>
        <Typography className={classes.returnText}>
            All Events
        </Typography>
        {/* <span style={{ color: COLOR.WHITE }}>return</span> */}
      </div>
      <Paper className={classes.paper}>
        <div style={{ position: "relative" }}>
          <Typography variant="h1" className={classes.title}>
            {event.id}
          </Typography>
          <svg
            className={classes.viewLogo}
            width="38"
            height="24"
            viewBox="0 0 38 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.7585 10.9623C37.419 10.5146 29.3304 0 18.9998 0C8.66921 0 0.580243 10.5146 0.241137 10.9619C-0.0803791 11.3867 -0.0803791 11.9627 0.241137 12.3875C0.580243 12.8352 8.66921 23.3498 18.9998 23.3498C29.3304 23.3498 37.419 12.8351 37.7585 12.3878C38.0805 11.9632 38.0805 11.3867 37.7585 10.9623ZM18.9998 20.9343C11.3902 20.9343 4.79951 13.9556 2.84852 11.6741C4.79699 9.39062 11.3739 2.41549 18.9998 2.41549C26.609 2.41549 33.1993 9.39305 35.1511 11.6757C33.2026 13.9591 26.6257 20.9343 18.9998 20.9343Z"
              fill="#AEC4F4"
            />
            <path
              d="M18.9999 4.42839C14.8554 4.42839 11.4834 7.67926 11.4834 11.6749C11.4834 15.6706 14.8554 18.9215 18.9999 18.9215C23.1444 18.9215 26.5164 15.6706 26.5164 11.6749C26.5164 7.67926 23.1444 4.42839 18.9999 4.42839ZM18.9999 16.5059C16.2367 16.5059 13.989 14.3388 13.989 11.6749C13.989 9.01107 16.2368 6.84395 18.9999 6.84395C21.763 6.84395 24.0109 9.01107 24.0109 11.6749C24.0109 14.3388 21.7631 16.5059 18.9999 16.5059Z"
              fill="#AEC4F4"
            />
          </svg>

          <svg
            ref={favLogo}
            className={classes.favLogo}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill={eventFavStatus ? COLOR.BIZTECH_GREEN : "none"}
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              handleClickFavouriteEvent(user.id, event.id);
            }}
          >
            <path
              d="M15.8188 25.7411L23.0056 30.2748C24.3218 31.1056 25.9323 29.8774 25.586 28.324L23.681 19.7985L30.0367 14.0547C31.197 13.007 30.5735 11.0202 29.0495 10.8937L20.6851 10.1532L17.412 2.0973C16.8232 0.634235 14.8143 0.634235 14.2255 2.0973L10.9525 10.1351L2.58797 10.8757C1.064 11.0021 0.440562 12.989 1.60085 14.0366L7.95648 19.7805L6.05153 28.306C5.70517 29.8593 7.31572 31.0876 8.63188 30.2567L15.8188 25.7411Z"
              stroke="#7AD040"
            />
          </svg>
        </div>
        <Markdown className={classes.description}>{event.description}</Markdown>
        <div className={classes.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            see more
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            sign me up
          </Button>
        </div>
      </Paper>
      <Snackbar
        open={snackOpen}
        TransitionComponent={TransitionUp}
        message={snackMsg}
        key="favourite"
      />
    </div>
  );
};

export default EventDescription;
