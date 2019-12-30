import React, { Component } from 'react'
import { Auth } from "aws-amplify";
import { setUser } from '../../actions/UserActions'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

export class LoginRedirect extends Component {

    getAuthenticatedUser() {
        Auth.currentAuthenticatedUser()
            .then(user => {
                const email = user.attributes.email
                if (email.substring(email.indexOf("@") + 1, email.length) === 'ubcbiztech.com') {
                    this.props.setUser(user)
                }
                else {
                    Auth.signOut()
                    alert('You must use a ubcbiztech.com email')
                }
            })
            .catch(() => console.log("Not signed in"))
    }

    componentDidMount() {
        // Check if there is an authenticated user
        // After authenticating with Google, Auth redirects to localhost:3000/login/ 
        // There is a time delay where Auth.currentAuthenticatedUser() returns the wrong value. Hence setTimeout()
        setTimeout(() => this.getAuthenticatedUser(), 800)
    }

    render() {
        return this.props.user
            ? <Redirect to="/" />
            : <div>if this is taking a long time please refresh<CircularProgress /></div>
    }

}

const mapStateToProps = state => {
    return {
        user: state.userState.user,
    };
};

export default connect(mapStateToProps, { setUser })(LoginRedirect);
