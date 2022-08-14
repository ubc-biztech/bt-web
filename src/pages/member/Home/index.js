import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchUserRegisteredEvents } from "store/user/userActions";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  CardHeader,
  CardMedia
} from "@material-ui/core";

// import House from "assets/house.svg";
import Calendar from "assets/calendar.png";
import { COLORS } from "constants/index";

const useStyles = makeStyles({
  container: {
    maxWidth: "85%",
    display: "flex",
    flexWrap: "wrap",
    margin: "30px auto",
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
  // flexbox: {
  //   display: "flex",
  //   width: "100%"
  // },
  // house: {
  //   position: "absolute",
  //   width: "33%",
  //   bottom: "0px",
  //   right: "10px"
  // },
  upcoming: {
    color: COLORS.BIZTECH_GREEN,
    margin: "20px 0 0 0"
  },
  greeting: {
    margin: "20px 0 0 0"
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
  },
  registeredEvents: {
    margin: "20px 20px 20px 0",
    width: "250px",
    height: "190px"
  },
  featuredEvents: {
    display: "flex",
    flexDirecton: "row",
    justifyItems: "center",
    margin: "20px 20px 0 0",
    width: "100%", //"790px", // good idea to make this a const
    height: "100%" //"100px"  // good idea to make this a const
  },
  featuredImg: {
    width: "500px", // good idea to make this a const
    height: "100px" // good idea to make this a const
  },
  registeredImg: {
    width: "250px", // good idea to make this a const
    height: "120px" // good idea to make this a const
  },
  alignVertical: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  cal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  alignHorizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  calendar: {
    width: "60px",
    height: "60px"
  },
  caption: {
    color: "white"
  },
  featured: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "75%",
    padding: "10px",
    alignItems: "center"
  },
  calendarText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  whiteText: {
    color: "white",
    backgroundColor: "#172037",
    width: "330px",
    borderRadius: "15px",
    textAlign: "center"
  }
});

function MemberHome(props) {
  const { user, registered, events } = props;

  const userName = user.admin ? "Biztech exec!" : user.fname;

  const classes = useStyles();

  // const [featuredEvent, setFeaturedEvent] = useState({});
  const [nextEvent, setNextEvent] = useState({});

  useEffect(() => {
    if (user && user.email) fetchUserRegisteredEvents({ userId: user.email });
  }, []);

  // 
  // const getFeaturedEvent = () => {
  //   if (events.length) {
  //     const randomEvent =
  //       events[Math.floor(Math.random() * (events.length - 1))];
  //     setFeaturedEvent(randomEvent);
  //   }
  // };

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
      //getFeaturedEvent();
    }
  }, [events]); // eslint-disable-line react-hooks/exhaustive-deps

  // function CardComponent({ children }) {
  //   return (
  //     <Card className={classes.card}>
  //       <CardContent>{children}</CardContent>
  //     </Card>
  //   );
  // }

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
    const { eventName, eventDate, imageUrl, cardStyle, eventId, deadline = {} } = props;
    const image = imageUrl || require("assets/default.png");
    if (eventName !== nextEvent.ename) {
      return (
        <Card className={classes.featuredEvents} key={eventId}>
          <CardMedia
            className={classes.featuredImg}
            component="img"
            title="event image"
            image={image}
          ></CardMedia>
            <CardHeader title={eventName} subheader={eventDate}></CardHeader>
        </Card>
      );
    } else {
      // NOTE: must fix this when there is more than one event on the web app
      return (
        <h2 className={classes.whiteText}>
          More events coming soon!
        </h2>
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
          <div className={classes.alignVertical}>
            <Typography variant="h5" className={classes.greeting}>
              Hi {userName}!
            </Typography>
            {/* <CardComponent>
            <Typography variant="h2">Hi {userName}!</Typography>
            <Typography>You are X events away from a reward!</Typography>
            <img src={House} className={classes.house} alt="BizTech House" />
          </CardComponent> */}
            {/* <CardComponent>
            <Typography variant="h2">Progress</Typography>
            {registered ? (
              <UserProgress registeredEvents={registered} events={events} />
            ) : (
                <Typography>No Registration Data found</Typography>
                
            )}
          </CardComponent> */}
            <Typography variant="h2" className={classes.upcoming}>
              Your next event
            </Typography>

            <div className={classes.column}>
              <div className={classes.alignHorizontal}>
                <RegisteredEventsCard
                  eventName={nextEvent.ename}
                  eventDate={
                    nextEvent.startDate && eventDate(nextEvent.startDate)
                  }
                  imageUrl={nextEvent.imageUrl}
                ></RegisteredEventsCard>
                {/* 
                <RegisteredEventsCard
                  eventName="Hello Hacks!"
                  eventDate={date1}
                ></RegisteredEventsCard>

                <RegisteredEventsCard
                  eventName="Tri-Mentorship Kickoff"
                  eventDate={date1}
                ></RegisteredEventsCard> */}

                {/* <CardComponent>
                  <Typography variant="h2" className={classes.green}>
                    Next Event
                  </Typography>
                  <Typography className={classes.eventName}>
                    {nextEvent.ename}
                  </Typography>
                  <Typography className={classes.eventDate}>
                    {nextEvent.startDate && eventDate(nextEvent.startDate)}
                  </Typography>
                </CardComponent> */}
              </div>

              <Typography variant="h2" className={classes.green}>
                Featured Events
              </Typography>

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
                  <h2 className={classes.whiteText}>
                    More events coming soon!
                  </h2>
                )}
                {/* <FeaturedEventsCard
                  eventName="MIS Night 2022"
                  eventDate={date1}
                ></FeaturedEventsCard> */}
              </div>

              {/* <CardComponent>
            <Typography variant="h2">Sticker Collection</Typography>
          </CardComponent> */}
              {/* <CardComponent>
            <Typography variant="h2">Prizes</Typography>
          </CardComponent> */}
            </div>
            {/* <div className={classes.flexbox}>
            <div className={classes.column}>                               // OLD NEXT EVENTS 
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
            <div className={classes.column}>                              // OLD FEATURED EVENTS
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
          </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MemberHome;
