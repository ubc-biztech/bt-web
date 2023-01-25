import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { Alert } from "@material-ui/lab";
import "./RegisterAlert.scss";

export default function MemberAlert() {
  const ignoreAlertPaths = ['/login', '/login-redirect', '/signup', '/signup/success', '/signup/success', '/redeem', '/companion']
  const location = useLocation()
  const [path, setPath] = useState(location.pathname)

  useEffect(() => {
    setPath(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    setPath(location.pathname)
  }, [location.pathname])

  return (
    <>
      {!ignoreAlertPaths.find((p) => (path.includes(p))) && 
        <Alert severity="warning">
          You are currently not a member!&nbsp;
          <Link to="/signup">Register here</Link>&nbsp;to renew your membership for the academic year!
        </Alert>
      }
    </>
  );
}
