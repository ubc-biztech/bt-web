import React, { Component } from 'react'
import Home from '../pages/admin/Home'
import Nav from './Nav'
import { Auth } from "aws-amplify";
import Login from './Authentication/Login'
import LoginRedirect from './Authentication/LoginRedirect'
import { setEvent, setEvents } from "../actions/PageActions";
import { setUser } from "../actions/UserActions";
import { connect } from "react-redux";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import './Router.scss';
import ScrollToTop from './ScrollToTop'
import EventRegister from '../pages/member/EventRegister';
import EventView from '../pages/admin/EventView'
import EventNew from '../pages/admin/EventNew';
import EventEdit from '../pages/admin/EventEdit'
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
                path="/event"
                render={props => <EventView {...props} />} />
              <Route
                path="/login-redirect"
                render={() => <LoginRedirect />} />
              <Route
                path="/new-event"
                render={() => <EventNew />} />
              <Route
                path="/edit-event"
                render={() => <EventEdit />} />
              <Route
                path="/page"
                render={() => <EventRegister />} />
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
              render={() => <EventRegister />} />
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
