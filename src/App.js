import React from "react";
import { Provider } from "react-redux";

import { ThemeProvider } from "context/ThemeContext";
import store from "./store/rootStore";

import CssBaseline from "@material-ui/core/CssBaseline";
import Router from "./router";

function App () {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
