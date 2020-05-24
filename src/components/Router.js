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
import ScrollToTop from './ScrollToTop'
import RegisterAlert from './Messages/RegisterAlert'

import AdminRoute from './Authentication/AdminRoute'
import Login from './Authentication/Login'
import LoginRedirect from './Authentication/LoginRedirect'

import Forbidden from '../pages/Forbidden'
import AdminHome from '../pages/admin/AdminHome'
import UserHome from '../pages/member/UserHome'
import EventRegister from '../pages/member/EventRegister'
import Invite from '../pages/member/Invite'
import Signup from '../pages/member/Signup'
import EventView from '../pages/admin/EventView'
import EventNew from '../pages/admin/EventNew'
import EventEdit from '../pages/admin/EventEdit'

import { setUser } from '../actions/UserActions'
import { log, getEvents } from '../utils'

class Router extends Component {
  getAuthenticatedUser() {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(authUser => {
        const email = authUser.attributes.email
        if (email.substring(email.indexOf('@') + 1, email.length) === 'ubcbiztech.com') {
          this.props.setUser({ ...authUser, admin: true });
        }
        else {
          console.log('not using a biztech e-mail!');
          this.props.setUser({ ...authUser, admin: false });
        }
      })
      .catch(() => log('Not signed in'))
  }

  componentDidMount() {
    getEvents()

    if (!this.props.user) this.getAuthenticatedUser();
  }

  render() {

    const { user } = this.props;

    // Alert the user about the need to register if they haven't
    const userNeedsRegister = user && !user.admin && !user.student_id;

    return (
      user
        ? <BrowserRouter>
          <ScrollToTop />
          <Nav events={this.props.events} />
          <div className="content">
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
                render={() => user.student_id
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
                altRender={() => <UserHome />} />

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
              path="/invite"
              component={Invite} />
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
