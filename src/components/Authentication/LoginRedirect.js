import React, { useEffect } from 'react'
import { Auth } from "aws-amplify";
import { setUser } from '../../actions/UserActions'
import { connect } from "react-redux";
import Loading from "../Loading";
import { withRouter } from "react-router-dom";
import { log, fetchBackend } from '../../utils'

function LoginRedirect(props) {

    const { user } = props;

    useEffect(() => {

        const pollForAuthenticatedUser = () => {
            Auth.currentAuthenticatedUser({ bypassCache: true })
                .then(async authUser => {
                    const { email } = authUser.attributes
    
                    // If biztech email, assume admin (no need for 'sign in')
                    if (email.substring(email.indexOf("@") + 1, email.length) === 'ubcbiztech.com') {
    
                        props.setUser({ ...authUser, admin: true });
                        props.history.push('/');
    
                    }
                    // If not biztech username (normal member)
                    else {
    
                        const student_id = authUser.attributes['custom:student_id'];
                        
                        // Detect if "first time sign up" by checking if custom:student_id is saved in the user pool
                        // If the user's student_id exists in the user pool, check if the user is registered in the database
                        // There is a possibility that a user exists in the user pool but not the database
                        if(student_id)  {
                            const user = await fetchBackend(`/users/${student_id}`, 'GET');
                            
                            if(user && user.id) { // check database
                                props.setUser({ ...authUser, admin: false }) // save to redux
                                props.history.push('/'); // Redirect to the 'user home' page
                                return null;
                            }
                            // if the user exists in the user pool, but not the database, remove the user pool's student_id
                            await Auth.updateUserAttributes(authUser, { 'custom:student_id': '' });
                            authUser.attributes['custom:student_id'] = null;
                        }
    
                        // If the user doesn't exist in the database and/or the user pool, redirect to the 'user register' form
                        props.setUser({ ...authUser, admin: false }) // save only essential info to redux
                        props.history.push('/signup');
                    }
    
                })
                .catch(() => {
                    log("Not signed in")
                    setTimeout(() => pollForAuthenticatedUser(), 200)
                })
        }

        // Check if there is an authenticated user
        // After authenticating with Google, Auth redirects to localhost:3000/login/ 
        if(user) {
            props.history.push("/");
        }

        // There is a time delay where Auth.currentAuthenticatedUser() returns the wrong value. Hence polling
        pollForAuthenticatedUser()

    }, []) // eslint-disable-line
    

    return (
        <Loading message="Signing in..."/>
    )

}

const mapStateToProps = state => {
    return {
        user: state.userState.user,
    };
};

export default connect(mapStateToProps, { setUser })(withRouter(LoginRedirect));
