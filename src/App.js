import React from 'react';
import Router from './components/Router'
import Event from './components/Event'
import EventSelector from './components/EventSelector'
import './app.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Authenticate } from './components/Authentication';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Authenticate />
          </Route>
          <Route path="/event">
            <Event />
          </Route>
          <Route path="/">
            <EventSelector />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
