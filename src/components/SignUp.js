import React, { useState } from 'react'
import { Auth } from "aws-amplify";
import { TextField, Button } from '@material-ui/core';
import { string, object } from 'yup';
import { useFormFields } from "../libs/hooks";

export default function SignUp() {

    const schema = object().shape({
        passwordConfirm: string().min(6).required("Please confirm your password"),
        password: string().min(6).required(),
        email: string().email().required()
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validate() {
        setIsLoading(true);

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
                setIsLoading(false);
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
                label="First Name"
                autoComplete="given-name"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Last Name"
                autoComplete="family-name"
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
            <Button variant="contained" disabled={isLoading} onClick={validate} >Login</Button>
        </form>
    )

    async function signIn() {

        try {
            await Auth.signUp({
                username: email,
                password,
            });
            alert("Signed up");
            setIsLoading(false);
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }

    }

    function handleKey(e) {
        if (e.key === 'Enter')
            validate()
    }
}
