import React from "react";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import {
  makeStyles
} from "@material-ui/core/styles";

const useStyles = makeStyles({
  logoutButton: {
    position: "absolute",
    left: "1em",
    top: "1em",
    cursor: "pointer",
    transform: "scale(1.5)",
  },
});

const LogoutButton = () => {
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.removeItem("companionEmail");
    window.location.reload();
  };

  return (
    <div className={classes.logoutButton}>
      <LogoutIcon onClick={handleLogout} />
    </div>
  );
};

export default LogoutButton;
