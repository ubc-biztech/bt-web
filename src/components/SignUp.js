import React, { useState } from 'react'
import { Auth } from "aws-amplify";
import { TextField, Button } from '@material-ui/core';
import { string, object } from 'yup';

export default function SignUp() {

    const schema = object().shape({
        passwordConfirm: string().min(6).required("Please confirm your password"),
        password: string().min(6).required(),
        email: string().email().required()
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    function validate() {
        schema
            .validate({
                email,
                password,
                passwordConfirm
            })
            .then(valid => {
                if (password === passwordConfirm)
                    signIn()
            })
            .catch(err => {
                console.log(err)
                alert(err.errors[0]);
            });
    }

    return (
        <form>
            <h1> Sign Up </h1>
            <TextField
                label="Email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Confirm Password"
                type="password"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                onKeyPress={e => handleKey(e)} />
            <br />
            <br />
            <Button variant="contained" onClick={validate} >Login</Button>
        </form>
    )

    async function signIn() {
        if (validate() === true) {
            try {
                await Auth.signIn(email, password);
                alert("Logged in");
            } catch (e) {
                alert(e.message);
            }
        }
    }

    function handleKey(e) {
        if (e.key === 'Enter')
            validate()
    }
}
