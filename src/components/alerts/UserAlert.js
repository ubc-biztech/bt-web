import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { Alert } from "@material-ui/lab";
import "./RegisterAlert.scss";


export default function UserAlert() {
  const ignoreAlertPaths = ['/login', '/login-redirect', '/signup', '/signup/success', '/redeem']

  const location = useLocation()
  const [path, setPath] = useState(location.pathname)

  useEffect(() => {
    setPath(location.pathname)
  }, [location.pathname])

  return (
    <>
      {!ignoreAlertPaths.find((p) => (path.includes(p) || path.slice(-7) === "partner")) && 
      <Alert severity="warning">
        You are not logged in and are currently viewing as guest.&nbsp;
        <Link to="/login">Login</Link>&nbsp;or&nbsp;<Link to="/signup">Signup</Link>&nbsp;to be able to register for
        events with ease!
      </Alert>
      }
    </>
  );
}
