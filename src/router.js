import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'
import {
  BrowserRouter,
  Switch,
  Redirect
} from 'react-router-dom'

import Nav from 'components/layout/Navigation'
import ScrollToTop from 'components/layout/ScrollToTop'
import RegisterAlert from 'components/alerts/RegisterAlert'
import Route from 'components/routing/Route'

import Login from 'pages/public/Login'
import LoginRedirect from 'pages/public/LoginRedirect'
// import Signup from '../pages/public/Signup'
import EventDetails from 'pages/public/Event/EventDetails'
import EventRegister from 'pages/public/Event/EventRegister'
import EventsList from 'pages/public/Event/EventsDashboard'

import Forbidden from 'pages/Forbidden'
import Loading from 'pages/Loading'
import NotFound from 'pages/NotFound'
import AdminRoutes from 'pages/admin'
import MemberRoutes from 'pages/member'

import { setUser } from 'store/user/UserActions'
import {
  log,
  updateUser,
  updateRegisteredEvents
} from 'utils'

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
            await Promise.all([updateUser(studentId), updateRegisteredEvents(studentId)])
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
    log(`Running biztech app in '${process.env.REACT_APP_STAGE || 'local'}' environment`)

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
    const { user } = this.props
    const { loaded } = this.state

    // Alert the user about the need to register if they haven't
    const userNeedsRegister = user && !user.admin && !user.id

    // check if the user state has been updated
    if (!loaded) return <Loading />
    else return (// eslint-disable-line curly
      <BrowserRouter>
        <ScrollToTop />
        {user && <Nav admin={user.admin} />}
        <div className='content'>
          {user && userNeedsRegister && <RegisterAlert />}
          <Switch>

            {/* ADMIN ROUTES */}
            {user && <Route path='/admin' component={AdminRoutes} />}

            {/* MEMBER ROUTES */}
            {user && <Route path='/member' component={MemberRoutes} />}

            {/* COMMON ROUTES */}
            <Route
              exact
              path='/event/:id/register'
              render={() => <EventRegister />} />
            <Route
              exact
              path='/event/:id'
              render={() => <EventDetails />} />
            <Route
              exact
              path='/events'
              featureFlag={'REACT_APP_SHOW_MAXVP'}
              render={() => <EventsList />} />

            {/* MISCELLANEOUS ROUTES */}
            <Route
              exact
              path='/forbidden'
              render={() => <Forbidden />} />
            <Route
              exact
              path='/404'
              render={() => <NotFound message='That page could not be found!'/>} />

            {/* AUTHENTICATION ROUTES */}
            {/* <Route (SIGNUP LOOKS UNUSED)
              exact
              path='/signup'
              featureFlag={'REACT_APP_SHOW_MAXVP'}
              render={() => <Signup />} /> */}
            <Route
              exact
              path='/login-redirect'
              render={() => <LoginRedirect />} />
            <Route
              exact
              path='/login'
              render={() => <Login />} />
            <Route
              path='/'
              render={() => user
                ? user.admin
                  ? <Redirect to='/admin/home' />
                  : <Redirect to='/member/home' />
                : <Redirect to='/login' />
              } />

          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.userState.user
  }
}

export default connect(mapStateToProps, { setUser })(Router)
