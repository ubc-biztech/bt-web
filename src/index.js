import React from "react";
import ReactDOM from "react-dom";
import Amplify, {
  Auth
} from "aws-amplify";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";
import "./overwrites.scss";
import {
  AWS_CONFIG
} from "./constants";

Amplify.configure(AWS_CONFIG);
Auth.configure(AWS_CONFIG);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
