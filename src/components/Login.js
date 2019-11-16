<<<<<<< HEAD
import React, { useState } from 'react'
import { Auth } from "aws-amplify";
import { TextField, Button } from '@material-ui/core';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form>
            <h1> Login </h1>
            <TextField
                label="Email"
                autocomplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Password"
                type="password"
                autocomplete="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={e => handleKey(e)} />
            <br />
            <br />
            <Button variant="contained" onClick={handleSubmit} >Login</Button>
        </form>
    )

    async function handleSubmit() {
        try {
            await Auth.signIn(email, password);
            alert("Logged in");
        } catch (e) {
            alert(e.message);
        }
    }

    function handleKey(e) {
        if (e.key === 'Enter')
            handleSubmit()
    }
}
=======
import React, { Component } from 'react'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pw: '',
            verified: false
        }
    }

    handleChange = (e) => {
        this.setState({ pw: e.target.value });
    }

    handleSubmit = (e) => {
        /* replace the value of v with backend function*/
        const v = this.state.pw === 'password';
        this.setState({ verified: v })
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Enter Password<br />
                    <input type='password' onChange={this.handleChange} value={this.state.pw} />
                    <input type='submit' value='Submit' />
                    {/* following paragraph element can be deleted - it's just used to demonstrate that verified is being changed*/}
                    <p>{this.state.verified.toString()}</p>
                </form>
            </div>
        )
    }
}

export default Login
>>>>>>> origin/master
