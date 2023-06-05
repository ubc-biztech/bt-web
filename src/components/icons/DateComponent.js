import React from "react";
import {
  Typography
} from "@material-ui/core";
import {
  makeStyles
} from "@material-ui/core/styles";
import {
  COLORS
} from "../../constants/_constants/theme";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "104px",
    height: "126px",
    [theme.breakpoints.down("sm")]: {
      width: "56px",
      height: "72px",
    },
  },
  monthContainer: {
    width: "100%",
    height: "30%",
    backgroundColor: COLORS.BIZTECH_GREEN,
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    position: "relative",
  },
  monthText: {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    fontSize: "18px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  dayContainer: {
    width: "100%",
    height: "62%",
    backgroundColor: COLORS.WHITE,
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    position: "relative",
  },
  dayNumber: {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    color: COLORS.BACKGROUND_COLOR,
    fontSize: "49px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "26px",
    },
  },
  dayOfWeek: {
    top: "90%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -90%)",
    color: COLORS.BACKGROUND_COLOR,
    fontSize: "11px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "8px",
    },
  },
}));

export default function DateComponent(props) {
  const classes = useStyles();
  const {
    month, dayOfMonth, dayOfWeek
  } = props;

  return (
    <div className={classes.container}>
      <div className={classes.monthContainer}>
        <Typography className={classes.monthText}>
          {month.toUpperCase()}
        </Typography>
      </div>
      <div className={classes.dayContainer}>
        <Typography className={classes.dayNumber}>{dayOfMonth}</Typography>
        <Typography className={classes.dayOfWeek}>{dayOfWeek}</Typography>
      </div>
    </div>
  );
}
