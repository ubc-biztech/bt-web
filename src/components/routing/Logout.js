import React from "react";
import {
  connect
} from "react-redux";
import {
  Auth
} from "aws-amplify";

import {
  Button
} from "@material-ui/core";
import {
  logout
} from "store/user/userActions";

export function Logout(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        Auth.signOut()
          .then((data) => {
            props.logout();
          })
          .catch((err) => console.log(err));
      }}
    >
      Sign Out
    </Button>
  );
}

export default connect(null, {
  logout
})(Logout);
