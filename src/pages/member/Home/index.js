import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, CardHeader, CardMedia } from "@material-ui/core";

import UserProgress from "./UserProgress";

import House from "assets/house.svg";
import { COLORS } from "constants/index";

import EventCard from "components/Event/EventCard";

const useStyles = makeStyles({
  container: {
    maxWidth: "85%",
    display: "flex",
    flexWrap: "wrap",
    margin: "75px auto",
    padding: "14px",
  },
  header: {
    color: COLORS.BIZTECH_GREEN,
    width: "100%",
  },
  column: {
    flex: "1",
  },
  card: {
    position: "relative",
    margin: "10px 10px 0 0",
    overflow: "visible",
  },
  flexbox: {
    display: "flex",
    width: "100%",
  },
  house: {
    position: "absolute",
    width: "33%",
    bottom: "0px",
    right: "10px",
  },
  green: {
    color: COLORS.BIZTECH_GREEN,
  },
  eventName: {
    fontSize: "24px",
    fontWeight: "normal",
  },
  eventDate: {
    fontWeight: "normal",
    color: COLORS.FONT_COLOR,
  },
  registeredEvents: {
    width: "250px", 
    height: "190px"
  }
});

function MemberHome(props) {
  const { user, registered, events } = props;

  const userName = user.admin ? "Biztech exec!" : user.fname;

  const classes = useStyles();

  const [featuredEvent, setFeaturedEvent] = useState({});
  const [nextEvent, setNextEvent] = useState({});

  const date1 = new Date('December 17, 1995 03:24:00');

  const getFeaturedEvent = () => {
    if (events.length) {
      const randomEvent =
        events[Math.floor(Math.random() * (events.length - 1))];
      setFeaturedEvent(randomEvent);
    }
  };

  /**
   * gets the next event that the user is registered for
   * verifies that the event is after the current time
   * sets next event to 'None Registered!' if no registered events found
   */
  const getNextEvent = async () => {
    if (!user || !registered) {
      setNextEvent({ ename: "None Registered!" });
      return;
    }
    events.forEach((event) => {
      const index = registered.findIndex(
        (registration) => registration.eventID === event.id
      );
      if (index !== -1) {
        // if the event has not passed yet
        if (new Date(event.startDate).getTime() > new Date().getTime())
          return setNextEvent(event);
        else return setNextEvent({ ename: "None Registered!" });
      }
    });
  };

  // set featured event and nextEvent based on events
  useEffect(() => {
    if (events) {
      getFeaturedEvent();
      getNextEvent();
    }
  }, [events]); // eslint-disable-line react-hooks/exhaustive-deps

  function CardComponent({ children }) {
    return (
      <Card className={classes.card}>
        <CardContent>{children}</CardContent>
      </Card>
    );
  }

  function RegisteredEventsCard(props) {
    const { eventName, eventDate, imageUrl, cardStyle, eventId = {} } = props;
    const image = imageUrl || require("assets/default.png");

    return (
      <Card className={classes.registeredEvents} key={eventId}> 
        <CardMedia
        className={classes.media}
        component="img"
        title="event image"
        image={image}>
        </CardMedia>
        <CardHeader
          title={eventName}
          subheader={
            {eventDate}
            ? new Date({eventDate}).toLocaleDateString("en-US", {
              day: "numeric",
              weekday: "long",
              month: "long",
              year: "numeric",
            })
          : ""
        }>
        </CardHeader>
      </Card>
      

      /*
      <Card className={classes.registeredEvents}>
        <div>
          <Typography className={classes.eventName}>{name}</Typography>
          <Typography className={classes.eventDate}>{date}</Typography>
        </div>
      </Card>
      */
    );
  }

  function eventDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      weekday: "long",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Biztech User Dashboard</title>
      </Helmet>
      <div className={classes.container}>
        <Typography variant="h1" className={classes.header}>
          Home
        </Typography>
        <div className={classes.column}>
          <CardComponent>
            <Typography variant="h2">Hi {userName}!</Typography>
            {/* <Typography>You are X events away from a reward!</Typography> */}
            <img src={House} className={classes.house} alt="BizTech House" />
          </CardComponent>
          <CardComponent>
            <Typography variant="h2">Progress</Typography>
            {registered ? (
              <UserProgress registeredEvents={registered} events={events} />
            ) : (
                <Typography>No Registration Data found</Typography>
                
            )}
          </CardComponent>
        </div>
        <div className={classes.column}>
          <RegisteredEventsCard eventName="MIS Night 2022" eventDate={date1}></RegisteredEventsCard>


          {/* <CardComponent>
            <Typography variant="h2">Sticker Collection</Typography>
          </CardComponent> */}
          {/* <CardComponent>
            <Typography variant="h2">Prizes</Typography>
          </CardComponent> */}
          <div className={classes.flexbox}>
            <div className={classes.column}>
              <CardComponent>
                <Typography variant="h2" className={classes.green}>
                  Next Event
                </Typography>
                <Typography className={classes.eventName}>
                  {nextEvent.ename}
                </Typography>
                <Typography className={classes.eventDate}>
                  {nextEvent.startDate && eventDate(nextEvent.startDate)}
                </Typography>
              </CardComponent>
            </div>
            <div className={classes.column}>
              <CardComponent>
                <Typography variant="h2" className={classes.green}>
                  Featured
                </Typography>
                <Typography className={classes.eventName}>
                  {featuredEvent.ename}
                </Typography>
                <Typography className={classes.eventDate}>
                  {featuredEvent.startDate &&
                    eventDate(featuredEvent.startDate)}
                </Typography>
              </CardComponent>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MemberHome;
