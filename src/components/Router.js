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
import Loading from './Loading'

import AdminRoute from './Authentication/AdminRoute'
import Login from './Authentication/Login'
import LoginRedirect from './Authentication/LoginRedirect'

import Forbidden from '../pages/Forbidden'
import AdminHome from '../pages/admin/AdminHome'
import UserHome from '../pages/member/UserHome'
import EventRegister from '../pages/member/EventRegister'
import Signup from '../pages/member/Signup'
import NewMember from '../pages/member/NewMember'
import EventView from '../pages/admin/EventView'
import EventNew from '../pages/admin/EventNew'
import EventEdit from '../pages/admin/EventEdit'
import EventDetails from '../pages/admin/EventDetails'

import { setUser } from '../actions/UserActions'
import { setRegistrations } from '../actions/RegistrationActions'
import {
  log,
  updateUser,
  updateRegistrations
} from '../utils'

class Router extends Component {
  constructor () {
    super()
    this.state = {
      loaded: false
    }
  }

  getAuthenticatedUser () {
    return Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(async authUser => {
        const email = authUser.attributes.email
        if (email.substring(email.indexOf('@') + 1, email.length) === 'ubcbiztech.com') {
          this.props.setUser({
            // name: authUser.attributes.name, // we don't need admin name for now
            email: authUser.attributes.email,
            admin: true
          })
        } else {
          const studentId = authUser.attributes['custom:student_id']
          if (studentId) {
            // Perform redux actions to update user and registration states at the same time
            await Promise.all([updateUser(studentId), updateRegistrations(studentId)]) 
          } else {
            // Parse first name and last name
            const initialName = authUser.attributes.name.split(' ')
            const fname = initialName[0]
            const lname = initialName[1]

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

  // User needs to be checked before the page physically renders
  // (otherwise, the login page will initially show on every refresh)
  componentDidMount () {
    if (!this.props.user) {
      // If the user doesn't already exist in react, get the authenticated user
      // also get events at the same time
      Promise.all([
        this.getAuthenticatedUser()
      ])
        .then(() => {
          // Ultimately, after all is loaded, set the "loaded" state and render the component
          this.setState({ loaded: true })
        })
    } else {
      // If the user already exists, update the events and render the page
      this.setState({ loaded: true })
    }
  }

  render () {
    const { user, registrations } = this.props
    const { loaded } = this.state

    // Alert the user about the need to register if they haven't
    const userNeedsRegister = user && !user.admin && !user.id

    return loaded ? (
      user
        ? <BrowserRouter>
          <ScrollToTop />
          <Nav admin={user.admin} />
          <div className='content'>
            {userNeedsRegister && <RegisterAlert />}
            <Switch>

              {/* COMMON ROUTES */}
              <Route
                path='/login-redirect'
                render={() => <LoginRedirect />} />
              <Route
                path='/forbidden'
                render={() => <Forbidden />} />
              <Route
                path='/new-member'
                render={() => user.id
                  ? <Redirect to='/' /> /* Allow create member only if user is not yet registered in DB */
                  : <NewMember />} />
              <Route
                path='/event/:id/register'
                render={() => <EventRegister />} />

              <Route
                path='/eventDetails/:id'
                render={props => <EventDetails {...props} user={user} registrations={registrations} />} />

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
              path='/signup'
              component={Signup} />
            <Route
              path='/'
              component={Login} />

            <Redirect to='/' />

          </Switch>
        </BrowserRouter >
    ) : <Loading />
  }
}

const mapStateToProps = state => {
  return {
    page: state.pageState.page,
    user: state.userState.user,
    registrations: state.registrationsState.registrations
  }
}

export default connect(mapStateToProps, { setUser })(Router)
