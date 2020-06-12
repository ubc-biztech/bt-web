import React, { Component } from 'react'
import { Auth } from "aws-amplify";
import { setUser } from '../../actions/UserActions'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { log, fetchBackend } from '../../utils'

export class LoginRedirect extends Component {

    componentDidMount() {
        // Check if there is an authenticated user
        // After authenticating with Google, Auth redirects to localhost:3000/login/ 
        if (this.props.user) {
            this.props.history.push("/");
        }
        // There is a time delay where Auth.currentAuthenticatedUser() returns the wrong value. Hence polling
        this.pollForAuthenticatedUser()

        // we don't want to keep polling forever
        this.timeoutRedirect = setTimeout(() => {
            console.log('Timed out')
            this.props.history.push('/');
        }, 6000)
    }

    pollForAuthenticatedUser() {
        Auth.currentSession()
            .then(async session => {
                const authUser = session.idToken.payload
                const { email, name } = authUser

                // If biztech email, assume admin (no need for 'sign in')
                if (email.substring(email.indexOf("@") + 1, email.length) === 'ubcbiztech.com') {
                    await fetchBackend(`/admin`, 'POST')
                        .then(() => {})
                        .catch(err => console.log(err))
                        
                    clearTimeout(this.timeoutRedirect)

                    this.props.setUser({
                        name,
                        email,
                        admin: true
                    });
                    this.props.history.push('/');

                }
                // If not biztech username (normal member)
                else {
                    const studentId = authUser['custom:student_id'];

                    // Detect if "first time sign up" by checking if custom:student_id is saved in the user pool
                    // If the user's student_id exists in the user pool, check if the user is registered in the database
                    // There is a possibility that a user exists in the user pool but not the database
                    if (studentId) {
                        fetchBackend(`/users/${studentId}`, 'GET')
                            .then(user => {
                                clearTimeout(this.timeoutRedirect)
                                this.props.setUser(user)
                                this.props.history.push('/'); // Redirect to the 'user home' page
                            })
                            .catch(async err => {
                                if (err.status === 404) {
                                    clearTimeout(this.timeoutRedirect)
                                    // if the user exists in the user pool, but not the database, remove the user pool's student_id
                                    await Auth.updateUserAttributes(authUser, { 'custom:student_id': '' });
                                    authUser['custom:student_id'] = null;

                                    this.populateUserAndRedirect(authUser)
                                } else {
                                    console.log(err.status)
                                }
                            })
                    } else {
                        // "First time sign up" aka no student_id in user pool
                        clearTimeout(this.timeoutRedirect)
                        this.populateUserAndRedirect(authUser)
                    }
                }
            })
            .catch((err) => {
                log('Not signed in')
                setTimeout(() => this.pollForAuthenticatedUser(), 300)
            })
    }

    // If the user doesn't exist in the database and/or the user pool, redirect to the 'user register' form
    populateUserAndRedirect(authUser) {
        // Parse first name and last name
        const initialName = authUser.name.split(' ')
        const fname = initialName[0];
        const lname = initialName[1];

        // save only essential info to redux
        this.props.setUser({
            email: authUser.email,
            fname,
            lname
        })

        this.props.history.push('/signup');
    }

    render() {
        return <CircularProgress />
    }

}

const mapStateToProps = state => {
    return {
        user: state.userState.user,
    };
};

export default connect(mapStateToProps, { setUser })(withRouter(LoginRedirect));
