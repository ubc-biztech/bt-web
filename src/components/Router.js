import React, { Component } from 'react'
import EventSelector from './EventSelector'
import ConnectedEvent from '../containers/ConnectedEvent'
import Event from './Event'
import Nav from './Nav'
import { Auth } from "aws-amplify";
import { Login, LoginRedirect } from './Authentication'
import './Router.scss';
import { setEvent, setEvents } from "../actions/PageActions";
import { setUser } from "../actions/UserActions";
import { connect } from "react-redux";
//import EventFormWrapper from './EventForm/EventFormWrapper';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import EventPage from "../pages/EventPage"
import './Router.scss';

import { API_URL } from '../utils'

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
    fetch(API_URL + "/events/get", {
    })
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
              render={() => <EventSelector events={this.props.events} />}
            />
          </Switch>
        </BrowserRouter>
        : <BrowserRouter>
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

// function ChooseBody(events, page, event) {
//   switch (page) {
//     case 'login':
//       return <Login /> 
//       // return <EventFormWrapper/>
//     case 'home':
//       return <EventSelector events={events} />
//     case 'event':
//       return <Event />
//     default:
//       return <p>Loading!</p>
//   }

// }

const mapStateToProps = state => {
  return {
    page: state.pageState.page,
    event: state.pageState.event,
    user: state.userState.user,
    events: state.pageState.events
  };
};

export default connect(mapStateToProps, { setUser, setEvent, setEvents })(Router);
