import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import './Router.scss'

import Nav from './Nav'
import UserNav from '../pages/member/UserNav'
import ScrollToTop from './ScrollToTop'
import RegisterAlert from './Messages/RegisterAlert'

import AdminRoute from './Authentication/AdminRoute'
import Login from './Authentication/Login'
import LoginRedirect from './Authentication/LoginRedirect'

import Forbidden from '../pages/Forbidden'
import AdminHome from '../pages/admin/AdminHome'
import UserHome from '../pages/member/UserHome'
import EventRegister from '../pages/member/EventRegister'
import Signup from '../pages/member/Signup'
import EventView from '../pages/admin/EventView'
import EventNew from '../pages/admin/EventNew'
import EventEdit from '../pages/admin/EventEdit'

import { setUser } from '../actions/UserActions'
import {
  log,
  updateEvents,
  updateUser
} from '../utils'

class Router extends Component {
  getAuthenticatedUser() {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(authUser => {
        console.log(authUser)
        const email = authUser.attributes.email
        if (email.substring(email.indexOf('@') + 1, email.length) === 'ubcbiztech.com') {
          this.props.setUser({
            // name: authUser.attributes.name, // we don't need admin name for now
            email: authUser.attributes.email,
            admin: true
          });
        }
        else {
          const studentId = authUser.attributes['custom:student_id']
          if (studentId) {
            updateUser(studentId)
          } else {
            // Parse first name and last name
            const initialName = authUser.attributes.name.split(' ')
            const fname = initialName[0];
            const lname = initialName[1];

            // save only essential info to redux
            this.props.setUser({
              email: authUser.attributes.email,
              fname,
              lname
            })
          }
        }
      })
      .catch(() => log('Not signed in'))
  }

  componentDidMount() {
    updateEvents()

    this.getAuthenticatedUser();
  }

  render() {

    const { user } = this.props;

    // Alert the user about the need to register if they haven't
    const userNeedsRegister = user && !user.admin && !user.id;
    console.log("props: " + this.props)
    return (
      user
        ? <BrowserRouter>
          <ScrollToTop />
          {user.admin
            ? <Nav events={this.props.events} />
            : <UserNav />}
          <div className={user.admin ? 'content' : 'userContent'}>
            {userNeedsRegister && <RegisterAlert />}
            <Switch>

              {/* COMMON ROUTES */}
              <Route
                path='/login-redirect'
                render={() => <LoginRedirect />} />
              <Route
                path="/forbidden"
                render={() => <Forbidden />} />
              <Route
                path="/signup"
                render={() => user.id
                  ? <Redirect to="/" /> /* Allow signup only if user is not yet registered in DB*/
                  : <Signup />} />
              <Route
                path='/event/:id/register'
                render={() => <EventRegister />} />

              {/* ADMIN ROUTES */}
              <AdminRoute
                path='/user-dashboard'
                render={() => <UserHome />} />
              <AdminRoute
                path='/event/new'
                render={() => <EventNew />} />
              <AdminRoute
                path='/event/:id/edit'
                render={() => <EventEdit />} />
              <AdminRoute
                path='/event/:id' // Need to make sure that this comes after 'new' and 'edit'
                render={props => <EventView {...props} />} />

              {/* HOME */}
              <AdminRoute
                exact
                path='/'
                render={() => <AdminHome />}
                altRender={() => <UserHome user={user} />} />

              <Redirect to='/' />

            </Switch>
          </div>
        </BrowserRouter>
        : <BrowserRouter>
          <ScrollToTop />
          <Switch>

            <Route
              path='/event/:id/register'
              component={EventRegister} />
            <Route
              path='/login-redirect'
              component={LoginRedirect} />
            <Route
              path='/'
              component={Login} />

            <Redirect to='/' />

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

export default connect(mapStateToProps, { setUser })(Router);
