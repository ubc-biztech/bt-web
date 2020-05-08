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

import AdminRoute from './Authentication/AdminRoute'
import Login from './Authentication/Login'
import LoginRedirect from './Authentication/LoginRedirect'

import Forbidden from '../pages/Forbidden'
import AdminHome from '../pages/admin/AdminHome'
import UserHome from '../pages/member/UserHome'
import UserSignup from '../pages/member/UserSignup'
import EventRegister from '../pages/member/EventRegister'
import EventView from '../pages/admin/EventView'
import EventNew from '../pages/admin/EventNew'
import EventEdit from '../pages/admin/EventEdit'

import { setEvents } from "../actions/PageActions"
import { setUser } from "../actions/UserActions"
import { fetchBackend } from '../utils'

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

    return (
      user
        ? <BrowserRouter>
          <ScrollToTop />
          <Nav events={this.props.events} />
          <div className="content">
            <Switch>
    
              {/* COMMON ROUTES */}
              <Route
                path="/login-redirect"
                render={() => <LoginRedirect />} />

              <Route
                path="/signup"
                render={() => <UserSignup />} />
              { /* ^^ NEED TO REMOVE FROM HERE - ROUTE SHOULD ONLY BE AVAILABLE IF USER NOT SIGNED IN YET ^^ */ }

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
                path="/event/new"
                render={() => <EventNew />} />
              <AdminRoute
                path="/event/:id/edit"
                render={() => <EventEdit />} />
              <AdminRoute
                path="/event/:id" // Need to make sure that this comes after "new" and "edit"
                render={props => <EventView {...props} />} />

              {/* HOME */}
              <AdminRoute
                exact
                path="/"
                render={() => <AdminHome />}
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
              path="/signup"
              render={() => <UserSignup />} />
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
    user: state.userState.user,
    events: state.pageState.events
  };
};

export default connect(mapStateToProps, { setUser, setEvents })(Router);
