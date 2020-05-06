import React, { Component } from 'react'
import { connect } from "react-redux"
import { Auth } from "aws-amplify"
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom"
import './Router.scss'

import Nav from './Nav'
import ScrollToTop from './ScrollToTop'

import Forbidden from './Forbidden'
import AdminRoute from './Authentication/AdminRoute'
import Login from './Authentication/Login'
import LoginRedirect from './Authentication/LoginRedirect'

import AdminHome from '../pages/admin/AdminHome'
import UserHome from '../pages/member/UserHome'
import UserRegister from '../pages/member/UserRegister'
import EventRegister from '../pages/member/EventRegister'
import EventView from '../pages/admin/EventView'
import EventNew from '../pages/admin/EventNew'
import EventEdit from '../pages/admin/EventEdit'

import { setEvent, setEvents } from "../actions/PageActions"
import { setUser } from "../actions/UserActions"
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
          this.props.setUser({ ...user, admin: true });
        }
        else {
          console.log('not using a biztech e-mail!');
          this.props.setUser({ ...user, admin: false });
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
      })

  }

  render() {

    const { user } = this.props;
    // TODO: Use "user.admin" to decide whether to show user pages/host pages

    console.log('route', { user })

    return (
      user
        ? <BrowserRouter>
          <ScrollToTop />
          <Nav events={this.props.events} />
          <div className="content">
            <Switch>
    
              {/* COMMON ROUTES */}
              <Route
                path="/login/redirect"
                render={() => <LoginRedirect />} />
              <Route
                path="/user-register"
                render={() => <UserRegister />} />
              <Route
                path="/event/:id/register"
                render={() => <EventRegister />} />
              <Route
                path="/forbidden"
                render={() => <Forbidden />} />

              {/* ADMIN ROUTES */}
              <AdminRoute
                path="/user-dashboard"
                render={() => <UserHome />} />
              <AdminRoute
                path="/event/:id"
                render={props => <EventView {...props} />} />
              <AdminRoute
                path="/new-event"
                render={() => <EventNew />} />
              <AdminRoute
                path="/edit-event"
                render={() => <EventEdit />} />

              {/* HOME */}
              <AdminRoute
                path="/"
                render={() => <AdminHome events={this.props.events} />}
                altRender={() => <UserHome />} />

            </Switch>
          </div>
        </BrowserRouter>
        : <BrowserRouter>
          <ScrollToTop />
          <Switch>
            <Route
              path="/event/:id/register"
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
