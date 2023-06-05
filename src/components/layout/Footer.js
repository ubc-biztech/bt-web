import React, {
  useState, useEffect
} from "react";
import Heart from "../../assets/heart.svg";
import {
  COLORS
} from "../../constants/_constants/theme";

import {
  useLocation
} from "react-router-dom";

import IconContainer from "./IconContainer";

import {
  makeStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";


const ICONS_MARGIN_RIGHT = "10px";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
  },
  careContainer: {
    display: "flex",
  },
  careText: {
    color: COLORS.FONT_GRAY,
    fontSize: "14px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "8px",
    },
  },
  heart: {
    height: "15px",
    width: "15px",
    marginTop: "3px",
    marginLeft: "5px",
    [theme.breakpoints.down("sm")]: {
      height: "8px",
      width: "8px",
    },
  },
}));

function Footer() {
  const classes = useStyles();

  const ignoreFooterPaths = ["/redeem", "/redemption", "/companion"];

  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  if (ignoreFooterPaths.find((p) => path.includes(p))) {
    return <></>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.careContainer}>
        <Typography className={classes.careText}>Made with care</Typography>
        <img src={Heart} className={classes.heart} alt="Love" />
      </div>
      <IconContainer marginRight={ICONS_MARGIN_RIGHT} />
    </div>
  );
}

export default Footer;
