import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Background from "assets/landingpagebg.svg";
import House from "assets/house.svg";
import Signpost from "assets/signpost.svg";
import SpeechBubble from "assets/landingpagespeech.svg";

import IconContainer from "components/layout/IconContainer";
import Markdown from "components/layout/Markdown";
import { CenterFocusStrong } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  main: {
    alignItems: 'center',
    height: "100vh",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "none",
    backgroundSize: "cover",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "-10px",
    }
  }
}));

function Trial(props) {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      {/* <img
          src={SpeechBubble}
          alt="Speech Bubble"
          className={classes.speechBubbleImage}
        /> */}
      {/* <img src={Signpost} alt="Signpost" className={classes.signpostImage} />
        <img src={House} alt="House" className={classes.houseImage} /> */}

      <p align="center">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/vLRyJ0dawjM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div className={classes.linkbar}>
          <Markdown align="center">

            {"happy may long :)"}
          </Markdown>
        </div>
      </p>
    </div>
  );
}

export default Trial;
