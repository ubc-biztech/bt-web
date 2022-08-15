import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchUserRegisteredEvents } from "store/user/userActions";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  CardHeader,
  CardMedia,
  CardContent
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import House from "assets/house.svg";
import Calendar from "assets/calendar.png";
import UserProgress from "./UserProgress";
import { COLORS } from "constants/index";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles({
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
    overflow: "visible"
  },
  flexbox: {
    display: "flex",
    width: "100%"
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
});

function MemberHome(props) {
  const { user, registered, events } = props;

  const userName = user.admin ? "Biztech exec!" : user.fname;

  const classes = useStyles();

  const [featuredEvent, setFeaturedEvent] = useState({});
  const [nextEvent, setNextEvent] = useState({});

  useEffect(() => {
    if (user && user.email) fetchUserRegisteredEvents({ userId: user.email });
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const getFeaturedEvent = () => {
    console.log("events length", events.length);
    if (events.length) {
      const randomEvent =
        events[Math.floor(Math.random() * (events.length - 1))];
      setFeaturedEvent(randomEvent);
    }
  };

  const daysTillDeadline = (eventDate) => {
    // console.log("event date", eventDate)
    const today = new Date();
    const parsedDate = new Date(eventDate);
    // console.log("today's ddate", today);
    const diff = (parsedDate.getTime() - today.getTime()) / (1000 * 60 * 60);
    console.log("diff", diff)
    const result = diff >= 24 ? Math.round(diff / 24) + " days" : Math.round(diff) + " hours";
    return result;
    // return Math.round(diff);
  };

  /**
   * gets the next event that the user is registered for
   * verifies that the event is after the current time
   * sets next event to 'None Registered!' if no registered events found
   */
  const getNextEvent = async () => {
    console.log("user name", user.fname);
    if (!user || !registered) {
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
    console.log("events", events);
    if (events) {
      getNextEvent();
      //getFeaturedEvent();
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

    if (nextEvent.ename === "None Registered!")
      return (
        <div className={classes.calendarText}>
          <div className={classes.cal}>
            <img
              src={Calendar}
              alt="calendar"
              className={classes.calendar}
            ></img>
          </div>

          <h5 className={classes.caption}>
            You are not registered for any events
          </h5>
        </div>
      );

    return (
      <Card className={classes.registeredEvents} key={eventId}>
        <CardMedia
          className={classes.registeredImg}
          component="img"
          title="event image"
          image={image}
        ></CardMedia>
        <CardHeader title={eventName} subheader={eventDate}></CardHeader>
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

  function FeaturedEventsCard(props) {
    const {
      eventName,
      eventDate,
      imageUrl,
      cardStyle,
      eventId,
      deadline
    } = props;
    const image = imageUrl || require("assets/default.png");
    if (eventName !== nextEvent.ename) {
      return (
        <CardComponent>
          <Typography variant="h2" className={classes.green}>
            Featured
          </Typography>
          <Typography className={classes.eventName}>{eventName}</Typography>
          <Typography className={classes.eventDate}>{eventDate}</Typography>
          <Typography className={classes.eventDate}>
            {daysTillDeadline(deadline)} left to register!
          </Typography>
        </CardComponent>
      );
    } else {
      // NOTE: must fix this when there is more than one event on the web app
      return (
        <CardComponent>
          <Typography variant="h2" className={classes.green}>
            Featured
          </Typography>
          <Typography className={classes.eventName}>
            More events coming!
          </Typography>
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
          <CardComponent>
            <Typography variant="h2">Sticker Collection</Typography>
            <Typography>Coming soon!</Typography>
          </CardComponent>
          <CardComponent>
            <Typography variant="h2">Prizes</Typography>
            <Typography>Coming soon!</Typography>
          </CardComponent>
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
              <div className={classes.featured}>
                {events ? (
                  events.map((ev) => (
                    <FeaturedEventsCard
                      eventName={ev.ename}
                      eventDate={ev.startDate && eventDate(ev.startDate)}
                      imageUrl={ev.imageUrl}
                      deadline={ev.deadline}
                    ></FeaturedEventsCard>
                  ))
                ) : (
                  <CardComponent>
                    <Typography variant="h2" className={classes.green}>
                      Featured
                    </Typography>
                    <Typography className={classes.eventName}>
                      More events coming!
                    </Typography>
                  </CardComponent>
                )}
                {/* <CardComponent>
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
              </CardComponent> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MemberHome;
