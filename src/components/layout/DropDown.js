import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

const useStyles = makeStyles((theme) => ({
    paper: {
      [theme.breakpoints.up("sm")]: {
        width: 600,
        margin: theme.spacing(3),
      },
    },
    content: {
      padding: "10px 20px 10px 20px",
    },
    dropDownButton: {
      cursor: "pointer",
      fontSize: "20px",
    }
}));

export default function DropDown(props) {
    const classes = useStyles();
    const [showDropDown, setShowDropDown] = useState(false);
    const { dropDownName, children } = props;
    return (
      <Paper className={classes.paper}>
          <div className={classes.content}>
            <Typography
              className={classes.dropDownButton}
              variant="h4"
              align="center"
              gutterBottom
              onClick={() => setShowDropDown(!showDropDown)}
              >
            {dropDownName}
            </Typography>
            <SlideDown>
              {
                showDropDown ? (
                  children
                ) : (
                  null
                )
              }
            </SlideDown>
          </div>
        </Paper>
    )
  }