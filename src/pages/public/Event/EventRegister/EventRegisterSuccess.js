import React, { useState } from "react";
import { withRouter, useHistory} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import LinkIcon from "@material-ui/icons/Link";
import HouseChef from "assets/housechef.svg";
import BackArrow from "assets/leftarrow.svg"; 
import SpeechBubble from "assets/registrationpagespeech.svg";

import { COLORS } from "../../../../constants/_constants/theme";

const ICON_SIZE = "24px";
const FLASH_TIME = "50";

const useStyles = makeStyles((theme) => ({
  main: {
    margin: "10px 0",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
  },
  successMessageContainer: {
    marginTop: "75px",
    paddingLeft: "19px",
    marginLeft: "13px",
  },
  successMessageHeading: {
    fontWeight: "bold",
    fontSize: "24px",
  },
  whereToNextContainer: {
    borderLeft: `2px solid ${COLORS.BIZTECH_GREEN}`,
    marginTop: "35px",
    paddingLeft: "19px",
    marginLeft: "11px",
  },
  whereToNextHeading: {
    fontWeight: "bold",
    fontSize: "24px",
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginLeft: "5px",
    verticalAlign: "bottom",
  },
  linkIcon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginLeft: "5px",
    verticalAlign: "bottom",
    "&:hover": {
      transform: "rotate(-30deg)",
      cursor: "pointer",
    },
  },
  linkCopiedMessageContainer: {
    paddingLeft: "19px",
    marginLeft: "13px",
  },
  linkCopiedMessage: {
    color: `${COLORS.LIGHT_YELLOW}`,
  },
  linkCopiedMessageHidden: {
    color: `${COLORS.LIGHT_YELLOW}`,
    visibility: "hidden",
  },
  upcomingEventsContainer: {
    border: "1px solid #485A78",
    borderRadius: "5px",
    padding: "19px",
  },
  upcomingEventsHeading: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  upcomingEventsItem: {
    marginTop: "13px",
  },
  upcomingEventsEname: {
    cursor: "pointer",
    color: `${COLORS.FONT_COLOR}`,
  },
  upcomingEventsDate: {},
  imageContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  houseChefImage: {
    width: "30%",
    marginLeft: "5%",
    [theme.breakpoints.between("sm", "md")]: {
      width: "15%", // On small and medium screens, images need to be shrunk a bit
    },
  },
  speechBubble: {
    alignSelf: "start",
    width: "55%",
    [theme.breakpoints.between("sm", "md")]: {
      width: "27.5%", // On small and medium screens, images need to be shrunk a bit
    },
  },
}));

const EventRegisterSuccess = ({
  email,
  upcomingEvents,
  resetRegistration,
  history,
  location,
}) => {
  const classes = useStyles();

  const [displayLinkMessage, setDisplayLinkMessage] = useState(false);

  let blinkingTimer;

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.host}${location.pathname}`
    );
    if (blinkingTimer) clearTimeout(blinkingTimer);

    // Create blinking effect when link icon clicked multiple times, for better UX experience
    setDisplayLinkMessage(false);
    blinkingTimer = setTimeout(() => setDisplayLinkMessage(true), FLASH_TIME);
  };

  const redirectEvent = (id, year) => {
    resetRegistration();
    history.push(`/event/${id}/${year}/register`); // Could redirect to main page instead
  };

  return (
    <Grid container spacing={4} className={classes.main}>
      <Grid item xs={12} lg={7} className={classes.leftColumn}>
        <div className={classes.successMessageContainer}>
          <Typography className={classes.successMessageHeading}>
            See you soon!
          </Typography>
          <Typography>
            You've successfully registered with <b>{email}</b>.
          </Typography>
          <Typography>We've sent you an email!</Typography>
        </div>
        <div className={classes.whereToNextContainer}>
          <Typography className={classes.whereToNextHeading}>
            What's next?
          </Typography>
          <Typography>
            Share the event with friends!
            <LinkIcon
              className={classes.linkIcon}
              onClick={() => copyLinkToClipboard()}
            />
          </Typography>
          
        </div>
        <div className={classes.linkCopiedMessageContainer}>
          {displayLinkMessage ? (
            <Typography className={classes.linkCopiedMessage} variant="caption">
              Registration Link Copied to Clipboard!
            </Typography>
          ) : (
            <Typography
              className={classes.linkCopiedMessageHidden}
              variant="caption"
            >
              Registration Link Copied to Clipboard!
            </Typography>
          )}
        </div>
      </Grid>
      <Grid item xs={12} lg={5} className={classes.rightColumn}>
        <div className={classes.imageContainer}>
          <img
            src={SpeechBubble}
            alt="Speech Bubble"
            className={classes.speechBubble}
          />
          <img
            src={HouseChef}
            alt="House with Chef Hat"
            className={classes.houseChefImage}
          />
        </div>
        <div className={classes.upcomingEventsContainer}>
          <Typography className={classes.upcomingEventsHeading}>
            Upcoming Events:
          </Typography>

          {upcomingEvents.map((event) => {
            const eventStart =
              event.startDate &&
              new Date(event.startDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
            const eventEnd =
              event.endDate &&
              new Date(event.endDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

            return (
              <div
                key={`${event.id};${event.year}`}
                className={classes.upcomingEventsItem}
              >
                <Typography
                  className={classes.upcomingEventsEname}
                  onClick={() => redirectEvent(event.id, event.year)}
                >
                  {event.ename}
                </Typography>
                <Typography
                  className={classes.upcomingEventsDate}
                  variant="caption"
                >
                  {eventStart}
                  {eventEnd && eventEnd !== eventStart ? ` - ${eventEnd}` : ""}
                </Typography>
              </div>
            );
          })}
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(EventRegisterSuccess);
