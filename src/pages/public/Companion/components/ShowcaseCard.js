import React, {useState} from "react";
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
import Test from "./../../../../assets/2024/techstyle/techstyle_test.jpg";
import CloseIcon from "@material-ui/icons/Close"

const useStyles = makeStyles({
  image: {
    maxWidth: "200px",
    maxHeight: "80%"
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
    color: "black",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center"
  },
  mobileName: {
    marginTop: "2%",
    color: "black",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center"
  },
  position: {
    marginTop: "2%",
    color: "black",
    fontSize: "0.5rem",
    textAlign: "center"
  },
  mobilePosition: {
    marginTop: "2%",
    color: "black",
    fontSize: "0.75rem",
    textAlign: "center"
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    color: "black",
    fontSize: "1.5rem",
    cursor: "pointer",
  }

});

function ShowcaseCard({
  title, desc, members, link, image, pos
}) {
  const classes = useStyles();
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      {isFullScreen ?
        <>
          <img alt={"project-picture"}
            style={{width: "100%"}} src={Test}/>
          <button
            className={classes.closeButton}
            onClick={toggleFullScreen}
          ><CloseIcon style={{color: "black"}}/></button>
        </>
        :
        <Box className={classes.container} style={{
          backgroundColor: "white",
        // backgroundImage: `url(card${(pos % 2) + 1}.svg)`
        }}>
          <img
            alt={"project-picture"}
            src={Test}
            // src={image}
            className={classes.image}
            onClick={toggleFullScreen}/>
          <Typography className={renderMobileOnly ? classes.mobileName : classes.name}>
            {title}
          </Typography>
          <Typography className={renderMobileOnly ? classes.mobilePosition : classes.position}>
            {members}
          </Typography>
          <Typography className={renderMobileOnly ? classes.mobilePosition : classes.position}>
            {desc}
          </Typography>
          {/* <a className={renderMobileOnly ? classes.mobilePosition : classes.position} href={link}>
          <p style={{
            textAlign: "center"
          }}>
                        learn more
          </p>
        </a> */}
        </Box>
      }
    </>
  );
}

export default ShowcaseCard;
