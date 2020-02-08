import React, { Component } from 'react'
import Home from './Home'
import ConnectedEvent from './ConnectedEvent'
import Nav from './Nav'
import { Auth } from "aws-amplify";
import { Login, LoginRedirect } from './Authentication'
import { setEvent, setEvents } from "../actions/PageActions";
import { setUser } from "../actions/UserActions";
import { connect } from "react-redux";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import EventPage from "../pages/EventPage"
import './Router.scss';
import ScrollToTop from './ScrollToTop'
import { fetchBackend } from '../utils'

const queryString = require('query-string');

class Router extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: null
    }
  }

  getAuthenticatedUser() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        const email = user.attributes.email
        if (email.substring(email.indexOf("@") + 1, email.length) === 'ubcbiztech.com') {
          this.props.setUser(user)
        }
        else {
          Auth.signOut()
          alert('You must use a ubcbiztech.com email')
        }
      })
      .catch(() => console.log("Not signed in"))
  }

  componentDidMount() {
    fetchBackend("/events/get", 'GET')
      .then((response) => response.json())
      .then((response) => {
        this.props.setEvents({
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
      this.props.user
        ? <BrowserRouter>
          <ScrollToTop />
          <Nav events={this.props.events} />
          <div className="content">
            <Switch>
              <Route
                path="/eventpage"
                render={EventPage} />
              <Route
                path="/event"
                render={props => <ConnectedEvent {...props} />} />
              <Route
                path="/login-redirect"
                component={LoginRedirect} />
              <Route
                path="/"
                render={() => <Home events={this.props.events} />}
              />
            </Switch>
          </div>
        </BrowserRouter>
        : <BrowserRouter>
          <ScrollToTop />
          <Switch>
            <Route
              path="/page"
              render={props => <EventPage />} />
            {/* Route for Andy's form
            <Route 
              path="/eventform"
              render={() => <EventForm event={this.props.events}/>} /> */}
            <Route
              path="/login-redirect"
              component={LoginRedirect} />
            <Route
              path="/"
              component={Login} />
          </Switch>
        </BrowserRouter >
    )
  }
}

const mapStateToProps = state => {
  return {
    page: state.pageState.page,
    event: state.pageState.event,
    user: state.userState.user,
    events: state.pageState.events
  };
};

export default connect(mapStateToProps, { setUser, setEvent, setEvents })(Router);
