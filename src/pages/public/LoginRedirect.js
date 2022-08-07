import React from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import Loading from 'pages/Loading'

import { setUser, logout } from 'store/user/userActions'
import { log, fetchBackend, checkFeatureFlag } from 'utils'

function LoginRedirect(props) {
  const history = useHistory()
  const location = useLocation()

  // we don't want to keep polling forever
  const timeoutRedirect = setTimeout(() => {
    log('Timed out!')
    history.push('/')
  }, 6000)

  const populateUserAndRedirect = (authUser, redirectRoute, admin = false) => {
    // Parse first name and last name
    const initialName = authUser.name.split(' ')
    const fname = initialName[0]
    const lname = initialName[1]

    // save only essential info to redux
    const userObject = admin
      ? {
          email: authUser.email,
          admin
        }
      : {
          email: authUser.email,
          fname,
          lname,
          admin
        }
    props.setUser(userObject)
    history.push(redirectRoute)
  }

  const pollForAuthenticatedUser = () => {
    // currentSession includes more auth information (such as token) than currentAuthenticatedUser
    Auth.currentSession({ bypassCache: true })
      .then(async (session) => {
        const authUser = session.idToken.payload
        const { email } = authUser

        // might have already set them to be an admin
        const isAdminGroup = authUser['cognito:groups']?.includes('admin')
        if (isAdminGroup) {
          populateUserAndRedirect(authUser, location.state.redirect || '/', true)
        } else if (
          email.substring(email.indexOf('@') + 1, email.length) ===
          'ubcbiztech.com'
        ) {
          // if biztech email, set them as admin (no need for 'sign in')
          // attempt to assign cognito group 'admin' to this user
          await fetchBackend('/admin', 'POST')
            .then(() => {})
            .catch((err) => console.log(err))

          populateUserAndRedirect(authUser, '/', true)
        } else {
          // If not biztech username (normal member)
          const email = authUser['email']
          // if maxvp is hidden, log out because we only want to allow biztech exec logins
          if (!checkFeatureFlag('REACT_APP_SHOW_MAXVP')) {
            alert('Sorry, login currently restricted to biztech executives!')
            await Auth.signOut()
            await props.logout()
            return null
          }

          // Detect if "first time sign up" by checking if custom:student_id is saved in the user pool
          // If the user's student_id exists in the user pool, check if the user is registered in the database
          // There is a possibility that a user exists in the user pool but not the database
          if (email) {
            try {
              // check database
              const user = await fetchBackend(`/users/${email}`, 'GET')
              clearTimeout(timeoutRedirect)
              const payload = {
                email: user.id,
                fname: user.fname,
                lname: user.lname,
                education: user.education,
                id: user.studentId,
                faculty: user.faculty,
                major: user.major,
                year: user.year,
                diet: user.diet,
                heardFrom: user.heardFrom,
                gender: user.gender,
                admin: user.admin,
                'favedEventsID;year': user['favedEventsID;year'],
                isMember: user.isMember
              }
              props.setUser(payload) // save to redux
              history.push(location.state?.redirect || '/') // Redirect to the 'user home' page
            } catch (err) {
              console.log(err)
              // if the user exists in the user pool, but not the database, remove the user pool's student_id
              if (err.status === 404) {
                clearTimeout(timeoutRedirect)

                // updateUserAttributes requires a user object and Auth.currentSession() does not provide the exact object needed
                const user = await Auth.currentAuthenticatedUser()
                await Auth.updateUserAttributes(user, {
                  'custom:student_id': ''
                })
                authUser['custom:student_id'] = null
                populateUserAndRedirect(authUser, '/signup')
              } else {
                console.log(
                  'Encountered an error querying database!',
                  err.status
                )
              }
            }
          } else {
            clearTimeout(timeoutRedirect)
            // If the user doesn't exist in the user pool, redirect to the 'user register' form
            populateUserAndRedirect(authUser, '/signup')
          }
        }
      })
      .catch(() => {
        log('Not signed in')
        setTimeout(() => pollForAuthenticatedUser(), 300)
      })
  }

  // There is a time delay where Auth.currentSession() returns the wrong value. Hence polling
  pollForAuthenticatedUser()

  return <Loading message="Signing in..." />
}

export default connect(null, { setUser, logout })(LoginRedirect)
