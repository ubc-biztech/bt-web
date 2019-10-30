import React, { Component } from 'react'
import { Auth } from "aws-amplify";
import { TextField, Button } from '@material-ui/core';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };
    };

    render() {
        return (
            <form>
                <TextField
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChangeUser.bind(this)}
                    name="username" />
                <br />
                <TextField
                    label="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChangePw.bind(this)}
                    name="username" />
                <br />
                <br />
                <Button variant="contained" onClick={this.handleSubmit.bind(this)} >Login</Button>
            </form>
        )
    }


    handleChangeUser(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePw(event) {
        this.setState({ password: event.target.value });
    }

    async handleSubmit(event) {
        try {
            await Auth.signIn(this.state.email, this.state.password);
            alert("Logged in");
        } catch (e) {
            alert(e.message);
        }
    }
}
