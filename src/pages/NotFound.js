import React from "react";
import {
  useHistory
} from "react-router-dom";

import {
  makeStyles
} from "@material-ui/core/styles";
import {
  Button, Typography
} from "@material-ui/core";

import SadImage from "assets/sad.png";
import {
  COLORS
} from "constants/index";

const useStyles = makeStyles({
  layout: {
    position: "absolute",
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
  },
  h1: {
    color: COLORS.BIZTECH_GREEN,
    fontSize: "5em",
    marginTop: 0,
    marginBottom: 0,
    display: "flex",
  },
  textContent: {
    paddingTop: "1em",
    paddingBottom: "1em",
    fontSize: "1.25em",
  },
  image: {
    height: "1em",
    filter:
      "invert(65%) sepia(79%) saturate(378%) hue-rotate(51deg) brightness(97%) contrast(88%)",
    // convert black go biztech green (https://codepen.io/sosuke/pen/Pjoqqp)
  },
});

export default function NotFound(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.layout}>
      <Typography variant="h1" className={classes.h1}>
        Oops&nbsp;
        <img src={SadImage} alt="not-found" className={classes.image} />
      </Typography>
      <Typography className={classes.textContent}>
        {props.message || "The requested resource could not be found!"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
      >
        Home
      </Button>
    </div>
  );
}
