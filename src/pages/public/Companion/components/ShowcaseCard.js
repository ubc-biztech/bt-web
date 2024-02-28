import React from "react";
import {
  Typography, Box
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  makeStyles
} from "@material-ui/core/styles";
import {
  useTheme
} from "@material-ui/styles";

const useStyles = makeStyles({
  image: {
    maxWidth: "200px",
    maxHeight: "120px"
  },
  container: {
    width: "350px",
    height: "350px",
    background: "transparent",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    paddingTop: "20px",
    display: "flex",
    margin: "8px",
    backgroundImage: "url('card.svg')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  name: {
    marginTop: "2%",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center"
  },
  mobileName: {
    marginTop: "2%",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center"
  },
  position: {
    marginTop: "2%",
    color: "#fff",
    fontSize: "0.5rem",
    textAlign: "center"
  },
  mobilePosition: {
    marginTop: "2%",
    color: "#fff",
    fontSize: "0.5rem",
    textAlign: "center"
  }

});

function ShowcaseCard({
  title, desc, members, link, image, pos
}) {
  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box className={classes.container} style={{
        backgroundImage: `url(card${(pos % 2) + 1}.svg)`
      }}>
        <img
          alt={"project-picture"}
          src={image}
          className={classes.image} />
        <Typography className={renderMobileOnly ? classes.mobileName : classes.name}>
          {title}
        </Typography>
        <Typography className={renderMobileOnly ? classes.mobilePosition : classes.position}>
          {members}
        </Typography>
        <Typography className={renderMobileOnly ? classes.mobilePosition : classes.position}>
          {desc}
        </Typography>
        <a className={renderMobileOnly ? classes.mobilePosition : classes.position} href={link}>
          <p style={{
            textAlign: "center"
          }}>
                        learn more
          </p>
        </a>
      </Box>
    </>
  );
}

export default ShowcaseCard;
