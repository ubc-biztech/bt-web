import React from "react"
import { Button, TextField } from "@material-ui/core";
import { useFormFields } from "../libs/hooks";

export default function Form() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        id: ""
    });

    return (
        <form>
            <TextField
                label="Email"
                autoComplete="email"
                id="email"
                value={fields.email}
                onChange={handleFieldChange}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Name"
                autoComplete="name"
                id="name"
                value={fields.name}
                onChange={handleFieldChange}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Student ID"
                id="id"
                value={fields.id}
                onChange={handleFieldChange}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Password"
                type="password"
                autoComplete="new-password"
                id="password"
                value={fields.password}
                onChange={handleFieldChange}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                value={fields.passwordConfirm}
                onChange={handleFieldChange}
                onKeyPress={e => handleKey(e)} />
            <br />
            <br />
            <Button variant="contained" >Sign up</Button>
        </form>
    )

    function handleKey(e) {
        if (e.key === 'Enter')
            console.log('hi')
    }
}