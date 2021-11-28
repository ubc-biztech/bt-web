import React from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import HouseChef from "assets/housechef.svg";
import SpeechBubble from "assets/registrationpagespeech.svg";

import { COLORS } from "../../../constants/_constants/theme";

import BiztechIcon from "../../../components/icons/BiztechIcon";
import Discord from "../../../components/icons/discord.svg";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const ICON_SIZE = "30px";
const MOBILE_SIZE = "20px";

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
    maxHeight: ICON_SIZE,
    maxWidth: ICON_SIZE,
    margin: "0",
    [theme.breakpoints.down("sm")]: {
      height: MOBILE_SIZE,
      width: MOBILE_SIZE,
      maxHeight: MOBILE_SIZE,
      maxWidth: MOBILE_SIZE,
    },
    padding: "0",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "15%",
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
  socialMediaList: {
    marginLeft: "0",
    paddingLeft: "0",
    listStyle: "none",
  },
  socialMediaListItem: {
    display: "flex",
    alignItems: "middle",
    verticalAlign: "middle",
    marginBottom: "10px",
  },
  socialMediaLinks: {
    color: COLORS.BIZTECH_GREEN,
    marginLeft: "20px",
    fontSize: "18px",
    lineHeight: ICON_SIZE,
    [theme.breakpoints.down("sm")]: {
      lineHeight: MOBILE_SIZE,
    },
    fontWeight: "500",
    textDecoration: "none",
    alignSelf: "middle",
    "&:hover": {
      color: COLORS.WHITE,
      textDecoration: "underline",
    },
  },
}));

const MembershipFormSuccess = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={4} className={classes.main}>
      <Grid item xs={12} lg={6} className={classes.leftColumn}>
        <div className={classes.successMessageContainer}>
          <Typography className={classes.successMessageHeading}>
            Welcome to the BizTech community!
          </Typography>
          <Typography>You've successfully become a BizTech member.</Typography>
          <Typography>A verification link has been sent to your email. Please verify yourself to login in the future!</Typography>
        </div>
        <div className={classes.whereToNextContainer}>
          <Typography className={classes.whereToNextHeading}>
            What's next?
          </Typography>
          <Typography>Find us on social media!</Typography>
          <ul className={classes.socialMediaList}>
            <li className={classes.socialMediaListItem}>
              <BiztechIcon
                className={classes.icon}
                fill={COLORS.WHITE}
                size={renderMobileOnly ? MOBILE_SIZE : ICON_SIZE}
              />
              <a
                href="https://www.ubcbiztech.com"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialMediaLinks}
              >
                Our website
              </a>
            </li>
            <li className={classes.socialMediaListItem}>
              <LinkedInIcon className={classes.icon} />
              <a
                href="https://www.linkedin.com/company/ubcbiztech/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialMediaLinks}
              >
                LinkedIn
              </a>
            </li>
            <li className={classes.socialMediaListItem}>
              <img src={Discord} className={classes.icon} alt="Discord" />
              <a
                href="https://discord.gg/tP6kbkmK5D"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialMediaLinks}
              >
                Discord
              </a>
            </li>
            <li className={classes.socialMediaListItem}>
              <FacebookIcon className={classes.icon} />
              <a
                href="https://www.facebook.com/BizTechUBC/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialMediaLinks}
              >
                Facebook
              </a>
            </li>
            <li className={classes.socialMediaListItem}>
              <InstagramIcon className={classes.icon} />
              <a
                href="https://www.instagram.com/ubcbiztech/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialMediaLinks}
              >
                Instagram
              </a>
            </li>
          </ul>
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
      </Grid>
    </Grid>
  );
};

export default withRouter(MembershipFormSuccess);
