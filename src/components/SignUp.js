import React, { useState } from 'react'
import { Auth } from "aws-amplify";
import { TextField, Button } from '@material-ui/core';

export default function SignUp(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form>
            <h1> Sign Up </h1>
            <TextField
                label="Email"
                autocomplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            <br />
            <TextField
                label="Password"
                type="password"
                autocomplete="password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
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
}
