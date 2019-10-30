import React from "react"
import { Button, TextField } from "@material-ui/core";

export default function Form(props) {
    const {
        values: { name, email, password, confirmPassword, id },
        errors,
        touched,
        handleSubmit,
        handleChange,
        isValid,
        setFieldTouched
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    return (
        <form
            onSubmit={handleSubmit}
        >
            <TextField
                label="Email"
                autoComplete="email"
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                id="email"
                value={email}
                onChange={change.bind(null, "email")}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Name"
                autoComplete="name"
                helperText={touched.name ? errors.name : ""}
                error={touched.name && Boolean(errors.name)}
                id="name"
                value={name}
                onChange={change.bind(null, "name")}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Student ID"
                helperText={touched.id ? errors.id : ""}
                error={touched.id && Boolean(errors.id)}
                id="id"
                value={id}
                onChange={change.bind(null, "id")}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Password"
                type="password"
                autoComplete="new-password"
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                id="password"
                value={password}
                onChange={change.bind(null, "password")}
                onKeyPress={e => handleKey(e)} />
            <br />
            <TextField
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                value={confirmPassword}
                onChange={change.bind(null, "confirmPassword")}
                onKeyPress={e => handleKey(e)} />
            <br />
            <br />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
            >
                Sign up
            </Button>
        </form>
    )

    function handleKey(e) {
        if (e.key === 'Enter')
            console.log('hi')
    }
}