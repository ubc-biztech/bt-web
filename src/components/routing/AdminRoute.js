import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Route from './Route'

// Route Wrapper that checks first if the user has admin privileges
// "User" should be obtained from redux through the "connect" function
const AdminRoute = ({ render, user = { admin: false }, nonAdminRender = null, ...rest }) => {
  return (
    <Route {...rest} render={() => (
      user.admin === true
        ? render()
        : nonAdminRender ? nonAdminRender() : <Redirect to='/forbidden' />
    )} />
  )
}

const mapStateToProps = state => ({
  user: state.userState.user
})

export default connect(mapStateToProps)(AdminRoute)
