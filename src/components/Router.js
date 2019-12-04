import React, { Component } from 'react'
import EventSelector from './EventSelector'
import Event from './Event'
import Nav from './Nav'
import { Login, LoginRedirect, Logout } from './Authentication'
import './Router.scss';
import { setPage, setEvent } from "../actions/PageActions";
import { connect } from "react-redux";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const queryString = require('query-string');

class Router extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: null
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_AMAZON_API + "/events/get", {
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          events: response
        })

        let eventId = queryString.parse(window.location.search)['event']
        if (eventId) {
          response.forEach(event => {
            if (event.id === eventId)
              this.props.setEvent(event)
          })
        }
      })

  }

  render() {
    return (
      <BrowserRouter>
        {this.props.user ? <Nav /> : null}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/event">
            <Event />
          </Route>
          <Route path="/login-redirect">
            <LoginRedirect />
          </Route>
          <Route path="/">
            {this.props.user ? <EventSelector /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    page: state.pageState.page,
    event: state.pageState.event,
    user: state.userState.user
  };
};

export default connect(mapStateToProps, { setPage, setEvent })(Router);
