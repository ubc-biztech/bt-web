import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";

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
  textContent: {
    paddingTop: "1em",
    fontSize: "1.25em",
  },
});

export default function Loading(props) {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <CircularProgress />
      <Typography className={classes.textContent}>{props.message}</Typography>
    </div>
  );
}
