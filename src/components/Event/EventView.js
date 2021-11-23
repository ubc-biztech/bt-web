import React, { useState, useEffect } from "react";
import Markdown from "components/layout/Markdown";
import { COLORS } from "../../constants/_constants/theme";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import DateComponent from "../../components/icons/DateComponent";
import EventIcon from "@material-ui/icons/Event";

const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up("sm")]: {
      width: 600,
      margin: "auto",
    },
  },
  paper: {
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(3),
    },
  },
  content: {
    padding: theme.spacing(3),
  },
  arrowStyle: {
    color: COLORS.BIZTECH_GREEN,
    fontSize: "36px",
  },
  dropDown: {
    display: "flex",
    cursor: "pointer",
    marginLeft: "-6px",
  },
  infoText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  banner: {
    maxWidth: "100%",
    borderRadius: "5px",
    // height: "234px",
    height: "400px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "234px",
    },
  },
  date: {
    position: "absolute",
    top: "80%",
    right: "4%",
  },
  descDate: {
    color: COLORS.BIZTECH_GREEN,
    fontSize: "14px",
    marginLeft: "5px",
  },
  desc: {
    [theme.breakpoints.down("sm")]: {
      border: `1px solid ${COLORS.CARD_PAPER_COLOR}`,
      padding: "10px",
    },
  }
}));

function formatAMPM(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  const ampm = hour > 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour !== 0 ? hour : 12;
  minute = minute < 10 ? "0" + minute : minute;
  return hour + ":" + minute + " " + ampm;
}

const EventView = ({ event, children }) => {
  const classes = useStyles();
  const [showDescription, setShowDescription] = useState(false);
  const [dateObj, setDateObj] = useState({
    month: "Jan",
    dayOfWeek: "Sunday",
    dayOfMonth: 1,
    startTime: "start time",
    endTime: "end time"
  });

  useEffect(() => {
    const startDate = new Date(event.startDate);
    const month = startDate.toLocaleDateString("default", { month: "short" });
    const dayOfMonth = startDate.getDate();
    const dayOfWeek = startDate.toLocaleDateString("default", {
      weekday: "long",
    });
    const startTime = formatAMPM(startDate);

    const endDate = new Date(event.endDate);
    const endTime = formatAMPM(endDate);

    const date = {
      month,
      dayOfWeek,
      dayOfMonth,
      startTime,
      endTime
    }
    setDateObj(date);
  }, [event.startDate, event.endDate]);

  return (
    <React.Fragment>
      <div style={{ position: "relative" }}>
        <img
          src={event.imageUrl || require("assets/placeholder.jpg")}
          className={classes.banner}
          alt="Event"
        />
        <div className={classes.date}>
          <DateComponent
            month={dateObj.month}
            dayOfMonth={dateObj.dayOfMonth}
            dayOfWeek={dateObj.dayOfWeek}
          />
        </div>
      </div>

      <div className={classes.content}>
        <Typography variant="h4" align="left" gutterBottom>
          {event.ename}
        </Typography>

        <div
          className={classes.dropDown}
          onClick={() => setShowDescription(!showDescription)}
        >
          {showDescription ? (
            <ArrowDropDown className={classes.arrowStyle} />
          ) : (
            <ArrowRight className={classes.arrowStyle} />
          )}
          <Typography className={classes.infoText} variant="h5">
            Info
          </Typography>
        </div>

        {showDescription ? (
          <div className={classes.desc}>
            <div style={{ display: "flex" }}>
              <EventIcon
                fontSize="small"
                style={{ color: COLORS.BIZTECH_GREEN }}
              />
              <Typography className={classes.descDate}>
                {dateObj.dayOfWeek}, {dateObj.month}. {dateObj.dayOfMonth} {dateObj.startTime}-{dateObj.endTime}
              </Typography>
            </div>
            <Markdown>{event.description}</Markdown>
          </div>
        ) : (
          <div />
        )}
        {children}
      </div>
    </React.Fragment>
  );
};

export default EventView;
