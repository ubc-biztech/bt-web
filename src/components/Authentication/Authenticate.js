import React, { Component } from 'react'
import { Auth } from "aws-amplify";
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout';

export default class Authenticate extends Component {

    componentDidMount() {
        setTimeout(() => {
            Auth.currentAuthenticatedUser()
                .then(user => console.log(user))
                .catch(() => console.log("Not signed in"));
        }, 500)
    }

    render() {
        return (
            <div>
                <Login />
                <Logout />
            </div>
        )
    }

}
