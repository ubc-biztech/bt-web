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
        if(this.props.user) {
            this.props.history.push("/");
        }
        // There is a time delay where Auth.currentAuthenticatedUser() returns the wrong value. Hence polling
        this.pollForAuthenticatedUser()
    }
    
    pollForAuthenticatedUser() {
        Auth.currentAuthenticatedUser()
            .then(async user => {
                const { email } = user.attributes

                // If biztech email, assume admin
                if (email.substring(email.indexOf("@") + 1, email.length) === 'ubcbiztech.com') {

                    this.props.setUser({ ...user, admin: true });
                    this.props.history.push('/');

                }
                // If not biztech username
                else {

                    // TODO: Supply email and names as initial values to the form (preferrably through queries)

                    // const { name } = user.attributes
                    // const nameSplitted = name.split(' ');
                    // const lname = nameSplitted.pop() || null;
                    // const fname = nameSplitted.join(' ');

                    const results = await fetchBackend(`/users/get?email=${email}`, 'GET');
                    const users = await results.json();
                    
                    this.props.setUser({ ...user, admin: false });

                    // Check if the user exists
                    if(users.length)  this.props.history.push('/'); // Redirect to the 'user home' page
                    else  this.props.history.push('/signup'); // Redirect to the 'user register' form
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
