import React, { Component } from 'react'
import { Auth } from "aws-amplify";
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout';

export default class Authenticate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log(user)
                this.setState({
                    user
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.user == null)
            return (
                <div>
                    <SignUp />
                    <Login />
                </div>
            )
        else return (
            <Logout />
        )
    }

}
