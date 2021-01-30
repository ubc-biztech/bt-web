import React from "react";
import BiztechIcon from "../icons/BiztechIcon";
import Discord from "../icons/discord.svg";
import { COLORS } from "../../constants/_constants/theme";

import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const ICON_SIZE = "24px";
const MOBILE_SIZE = "16px";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    display: "flex",
    marginLeft: (props) => props.marginLeft || "auto",
    marginRight: (props) => props.marginRight || "auto",
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    margin: "5px",
    [theme.breakpoints.down("sm")]: {
      height: MOBILE_SIZE,
      width: MOBILE_SIZE,
    },
  },
}));

function IconContainer(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const renderMobileOnly = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.iconContainer}>
      <a
        href="https://www.ubcbiztech.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BiztechIcon
          fill={COLORS.WHITE}
          size={renderMobileOnly ? MOBILE_SIZE : ICON_SIZE}
          margin="5px"
        />
      </a>
      <a
        href="https://www.linkedin.com/company/ubcbiztech/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon className={classes.icon} />
      </a>
      <a
        href="https://discord.gg/tP6kbkmK5D"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Discord} className={classes.icon} alt="Discord" />
      </a>
      <a
        href="https://www.facebook.com/BizTechUBC/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon className={classes.icon} />
      </a>
      <a
        href="https://www.instagram.com/ubcbiztech/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon className={classes.icon} />
      </a>
    </div>
  );
}

export default IconContainer;
