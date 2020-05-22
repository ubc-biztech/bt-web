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
        Auth.currentAuthenticatedUser({ bypassCache: true })
            .then(async authUser => {
                const { email } = authUser.attributes
                clearTimeout(this.timeoutRedirect)

                // If biztech email, assume admin (no need for 'sign in')
                if (email.substring(email.indexOf("@") + 1, email.length) === 'ubcbiztech.com') {

                    this.props.setUser({ ...authUser, admin: true });
                    this.props.history.push('/');

                }
                // If not biztech username (normal member)
                else {
                    const studentId = authUser.attributes['custom:student_id'];

                    // Detect if "first time sign up" by checking if custom:student_id is saved in the user pool
                    // If the user's student_id exists in the user pool, check if the user is registered in the database
                    // There is a possibility that a user exists in the user pool but not the database
                    if (studentId) {
                        fetchBackend(`/users/${studentId}`, 'GET')
                            .then(user => {
                                if (user.id) {
                                    this.props.setUser({ ...user, admin: false }) // save to redux
                                    this.props.history.push('/'); // Redirect to the 'user home' page
                                    return null;
                                }
                            })
                            .catch(async err => {
                                if (err.status === 404) {
                                    // if the user exists in the user pool, but not the database, remove the user pool's student_id
                                    await Auth.updateUserAttributes(authUser, { 'custom:student_id': '' });
                                    authUser.attributes['custom:student_id'] = null;
                                    // If the user doesn't exist in the database and/or the user pool, redirect to the 'user register' form
                                    this.props.setUser({ ...authUser }) // save only essential info to redux
                                    this.props.history.push('/signup');
                                } else {
                                    console.log(err.status)
                                }
                            })
                    } else {
                        // No student ID
                        this.props.setUser({ ...authUser }) // save only essential info to redux
                        this.props.history.push('/signup');
                    }
                }
            })
            .catch(() => {
                log("Not signed in")
                setTimeout(() => this.pollForAuthenticatedUser(), 200)
            })
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
