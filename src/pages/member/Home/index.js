import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchUserRegisteredEvents } from "store/user/userActions";

import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, CardContent } from "@material-ui/core";

import House from "assets/house.svg";
// import Calendar from "assets/calendar.png";
import UserProgress from "./UserProgress";
import { COLORS } from "constants/index";
// import { green } from "@material-ui/core/colors";

import Joyride from "react-joyride";
import { Link } from 'react-router-dom';
import { checkViewedFeatures, setViewedFeatures } from "utils";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "85%",
    display: "flex",
    flexWrap: "wrap",
    margin: "75px auto",
    padding: "14px"
  },
  header: {
    color: COLORS.BIZTECH_GREEN,
    width: "100%"
  },
  column: {
    flex: "1"
  },
  card: {
    position: "relative",
    margin: "10px 10px 0 0",
    overflow: "visible",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginRight: "0"
    }
  },
  flexbox: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  house: {
    position: "absolute",
    width: "33%",
    bottom: "0px",
    right: "10px"
  },
  green: {
    color: COLORS.BIZTECH_GREEN
  },
  eventName: {
    fontSize: "24px",
    fontWeight: "normal"
  },
  eventDate: {
    fontWeight: "normal",
    color: COLORS.FONT_COLOR
  }
}));


function MemberHome(props) {
  const { user, registered, events } = props;

  const userName = user.admin ? "Biztech exec!" : user.fname;

  const classes = useStyles();

  const [featuredEvent, setFeaturedEvent] = useState({});
  const [nextEvent, setNextEvent] = useState({});

  useEffect(() => {
    if (user && user.email) fetchUserRegisteredEvents({ userId: user.email });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getFeaturedEvent = () => {
    const index = events.findIndex(
      (ev) =>
        ev.ename !== nextEvent.ename &&
        new Date(ev.startDate).getTime() > new Date().getTime() &&
        new Date(ev.deadline).getTime() > new Date().getTime() && 
        ev.isPublished
    );
    if (index !== -1) {
      // if a featured event exists
      setFeaturedEvent(events[index]);
    } else {
      setFeaturedEvent({
        ename: "Events coming soon!",
        eventDate: null,
        deadline: null
      });
    }

    // if (events.length) {
    //   const randomEvent =
    //     events[Math.floor(Math.random() * (events.length - 1))];
    //   setFeaturedEvent(randomEvent);
    // }
  };

  const daysTillDeadline = (eventDate) => {
    const today = new Date();
    const parsedDate = new Date(eventDate);
    const diff = (parsedDate.getTime() - today.getTime()) / (1000 * 60 * 60);
    const result =
      diff >= 24
        ? Math.round(diff / 24) + " days"
        : Math.round(diff) + " hours";
    return result;
  };

  /**
   * gets the next event that the user is registered for
   * verifies that the event is after the current time
   * sets next event to 'None Registered!' if no registered events found
   */
  const getNextEvent = async () => {
    if (!user || !registered || registered.length === 0) {
      setNextEvent({ ename: "None Registered!" });
      return;
    }
    events.forEach((event) => {
      const index = registered.findIndex(
        (registration) =>
          registration["eventID;year"] === event.id + ";" + event.year
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
      getNextEvent();
      // getFeaturedEvent();
    }
  }, [registered, events]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getFeaturedEvent();
  }, [nextEvent]) // eslint-disable-line react-hooks/exhaustive-deps

  function CardComponent({ children }) {
    return (
      <Card className={classes.card}>
        <CardContent>{children}</CardContent>
      </Card>
    );
  }

  function FeaturedEventsCard(props) {
    const { eventName, eventDate, eventDeadline } = props;

    if (eventDeadline) {
      return (
        <CardComponent>
          <Typography variant="h2" className={classes.green}>
            Featured
          </Typography>
          <Typography className={classes.eventName}>{eventName}</Typography>
          <Typography className={classes.eventDate}>{eventDate}</Typography>
          <Typography className={classes.eventDate}>
            {daysTillDeadline(eventDeadline)} left to register!
          </Typography>
        </CardComponent>
      );
    } else {
      return (
        <CardComponent>
          <Typography variant="h2" className={classes.green}>
            Featured
          </Typography>
          <Typography className={classes.eventName}>{eventName}</Typography>
        </CardComponent>
      );
    }
  }

  function eventDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      weekday: "long",
      month: "long",
      year: "numeric"
    });
  }

  function ShowOnbaording() {
    if (!checkViewedFeatures(user, "Home")) {
      return (     
      <Joyride
        steps={steps}
        continuous = {true}
        showProgress = {true}
        styles={{
          options: {
            backgroundColor: '#182138',
            primaryColor: '#79D03F',
            textColor: '#FFFFFF',
            zIndex: 1000,
          },
          tooltip: {
            borderRadius: 10
          },
          buttonNext: {
            outline: 'none',
            borderRadius: 5
          },
          buttonBack: {
            outline: 'none',
            borderRadius: 5
          }
        }}
      />
    )
  } else {
    return null
  }
}

  const steps = [
    {
      disableBeacon: true,
      target: ".summary",
      title: "Summary",
      content:
        "Here is a summary of all your events"
    },
    {
      target: ".stickers",
      title: "Stickers",
      content:
        "Here are all the stickers you have earned."
    },
    {
      target: ".prizes",
      title: "Prizes",
      content:
        "Here are all the prizes you have won."
    },
    {
      target: ".next-event",
      title: "Your Next Event",
      content:
        "Here is your next event"
    },
    {
      target: ".featured-event",
      title: "Featured Event",
      disableBeacon: true,
      hideCloseButton: true,
      hideFooter: true,
      disableOverlayClose: true,
      content:
      <div>
        <p>Here is the current featured event</p>
        <p>Click&nbsp;
          <Link to="/events" style={{ color: '#79D03F' }}>here</Link> 
          &nbsp;to go to Events 
        </p>
      </div>
    }
  ];

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
            <Typography variant="h2">
              {userName === undefined ? "Hi there!" : "Hi " + userName + "!"}
            </Typography>
            {/* <Typography>You are X events away from a reward!</Typography> */}
            <img src={House} className={classes.house} alt="BizTech House" />
          </CardComponent>

          <div className="summary">
            <CardComponent>
              <Typography variant="h2">Summary</Typography>
              {registered ? (
                <UserProgress registeredEvents={registered} events={events} />
              ) : (
                <Typography>No Past Registration Data found</Typography>
              )}
            </CardComponent>
          </div>
        </div>
        <div className={classes.column}>
          <div className="stickers">
            <CardComponent>
              <Typography variant="h2">Sticker Collection</Typography>
              <Typography>Coming soon!</Typography>
            </CardComponent>
          </div>
          <div className="prizes">
          <CardComponent>
            <Typography variant="h2">Prizes</Typography>
            <Typography>Coming soon!</Typography>
          </CardComponent>
          </div>
          <div className={classes.flexbox}>
            <div className="next-event">
            <div className={classes.column}>
              <CardComponent>
                <Typography variant="h2" className={classes.green}>
                  Your Next Event
                </Typography>
                <Typography className={classes.eventName}>
                  {nextEvent.ename}
                </Typography>
                <Typography className={classes.eventDate}>
                  {nextEvent.startDate && eventDate(nextEvent.startDate)}
                </Typography>
              </CardComponent>
            </div>
            </div>
            <div className="featured-event">
            <div className={classes.column}>
              <FeaturedEventsCard
                eventName={featuredEvent.ename}
                eventDate={featuredEvent.eventDate}
                eventDeadline={featuredEvent.deadline}
              ></FeaturedEventsCard>
            </div>
            </div>
          </div>
        </div>
      </div>
      <ShowOnbaording>
      </ShowOnbaording>
    </React.Fragment>
  );
}

export default MemberHome;
