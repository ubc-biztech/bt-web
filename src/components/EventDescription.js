import React, { useState, useRef } from "react";
import { makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Markdown from "./Markdown";
import Paper from "@material-ui/core/Paper";
import { COLOR } from "../constants/Constants";

import Button from "@material-ui/core/Button";

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

  title: {
    color: COLOR.WHITE,
    display: "inline-block",
    fontSize: "36px",
    fontStyle: "bold"
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
    marginLeft: "10px",
  },

  buttonGroup: {
    position: "absolute",
    right: "100px"
  },
}));

const handleClickFavouriteEvent = (favLogo, event, user) => {
    console.log(event);
    console.log(user);
    //favLogo.style.fill = COLOR.BIZTECH_GREEN;
}

const handleClickReturnEvent = (event) => {
   
}


const EventDescription = ({ user, event, children }) => {
  const classes = useStyles();
  const favLogo = useRef(null);
  return (
    <div className={classes.content}>
      <div style={{ color: COLOR.WHITE }}>return</div>
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
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={()=>{handleClickFavouriteEvent(favLogo, event, user)}}
          >
            <path
              d="M15.8188 25.7411L23.0056 30.2748C24.3218 31.1056 25.9323 29.8774 25.586 28.324L23.681 19.7985L30.0367 14.0547C31.197 13.007 30.5735 11.0202 29.0495 10.8937L20.6851 10.1532L17.412 2.0973C16.8232 0.634235 14.8143 0.634235 14.2255 2.0973L10.9525 10.1351L2.58797 10.8757C1.064 11.0021 0.440562 12.989 1.60085 14.0366L7.95648 19.7805L6.05153 28.306C5.70517 29.8593 7.31572 31.0876 8.63188 30.2567L15.8188 25.7411Z"
              stroke="#7AD040"
            />
          </svg>
        </div>
        <Markdown className={classes.description}>{event.description}</Markdown>
        <div className={classes.buttonGroup}>
          <Button variant="contained" color="primary" className={classes.button}>
            see more
          </Button>
          <Button variant="contained" color="secondary" className={classes.button}>
            sign me up
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default EventDescription;
