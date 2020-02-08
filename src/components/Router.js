import React, { Component } from 'react'
import EventSelector from './EventSelector'
import ConnectedEvent from './ConnectedEvent'
import Nav from './Nav'
import { Auth } from "aws-amplify";
import { Login, LoginRedirect } from './Authentication'
import './Router.scss';
import { setEvent, setEvents } from "../actions/PageActions";
import { setUser } from "../actions/UserActions";
import { connect } from "react-redux";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import './Router.scss';
import EventPage from '../pages/EventPage';
import { NewEventForm } from './Forms/NewEventForm/';
import EditEventForm from './Forms/EditEventForm/EditEventForm'
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
          <Nav events={this.props.events} />
          <Switch>
            <Route
              path="/event"
              render={props => <ConnectedEvent {...props} />} />
          </Switch>
          <Switch>
            <Route
              path="/login-redirect"
              component={LoginRedirect} />
          </Switch>
          <Switch>
            <Route
              path="/new-event"
              component={NewEventForm} />
          </Switch>
          <Switch>
            <Route
              path="/edit-event"
              component={EditEventForm} />
          </Switch>
          <Switch>
            <Route
              path="/"
              render={() => <EventSelector events={this.props.events} />}
            />
          </Switch>
        </BrowserRouter>
        : <BrowserRouter>
          <Switch>
            <Route
              path="/page"
              render={() => <EventPage />} />
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
