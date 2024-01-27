import React from "react";
import {
  Avatar, Typography, Box, Chip
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  makeStyles
} from "@material-ui/core/styles";
import {
  useTheme
} from "@material-ui/styles";
import {
  COLORS
} from "constants/index";
import {
  constantStyles
} from "constants/_constants/companion";

const useStyles = makeStyles({
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    borderRadius: "10px",
    padding: "6%",
    height: "100%",
    width: "100%",
  },
  mobileProfileContainer: {
    // marginBottom: "2%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    borderRadius: "10px",
    padding: "6%",
    height: "100%",
  },
  name: {
    marginTop: "2%",
    color: COLORS.LIGHT_BACKGROUND_COLOR,
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center"
  },
  mobileName: {
    marginTop: "2%",
    color: COLORS.LIGHT_BACKGROUND_COLOR,
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center"
  },
  position: {
    marginTop: "2%",
    color: COLORS.LIGHT_BACKGROUND_COLOR,
    fontSize: constantStyles.fontSize,
    textAlign: "center"
  },
  mobilePosition: {
    marginTop: "2%",
    color: COLORS.LIGHT_BACKGROUND_COLOR,
    fontSize: constantStyles.mobileFontSize,
    textAlign: "center"
  },
  skill: {
    marginTop: "2%"
  },
  profilePicture: {
    width: "150px",
    height: "150px",
    backgroundColor: COLORS.LIGHT_BACKGROUND_COLOR
  },
  mobileProfilePicture: {
    width: "100px",
    height: "100px",
    backgroundColor: COLORS.LIGHT_BACKGROUND_COLOR
  },
  container: {
    height: "100%",
    flex: "0 3 350px",
    display: "flex",
    // border: "solid red 2px"
  },
  skillsContainer: {
    display: "flex",
    justifyContent: "left",
    marginTop: "5%",
    flexWrap: "wrap",
    gap: "0.3vw 0.3vh"
  },
  mobileContainer: {
    width: "100%",
    height: "100%",
  },
  linkedinImage: {
    width: "20%",
    height: "auto"
  },
  linkedNoUnderline: {
    textDecoration: "none"
  }
});

function MentorCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    fname, lname, role, gender, companyName, profilePhoto, linkedin, skills
  } = props.mentor;

  return (
    <>
      <Box className={renderMobileOnly ? classes.mobileContainer : classes.container}>
        <Box className={renderMobileOnly ? classes.mobileProfileContainer : classes.profileContainer}>
          <a href={linkedin} className={classes.linkedNoUnderline} target="_blank" rel="noreferrer">
            <Avatar
              alt={`${fname}-profile-picture`}
              src={profilePhoto}
              className={renderMobileOnly ? classes.mobileProfilePicture : classes.profilePicture} />
          </a>
          <a href={linkedin} className={classes.linkedNoUnderline} target="_blank" rel="noreferrer">
            <Typography className={renderMobileOnly ? classes.mobileName : classes.name}>
              {fname + " " + lname + `${gender === "" ? "" : ` (${gender})`}`}
            </Typography>
          </a>
          <Typography className={renderMobileOnly ? classes.mobilePosition : classes.position}>
            {role}
          </Typography>
          <div className={classes.skillsContainer}>
            {
              skills.map((skill, idx) => <Chip key={idx} label={skill} variant="outlined" />)
            }
          </div>
        </Box>
      </Box>
    </>
  );
}

export default MentorCard;
