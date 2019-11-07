import React, { useState } from 'react'
import { Auth } from "aws-amplify";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#ffffff' },
        secondary: { main: '#3b5998' }
    },
});

const styles = {
    left: {
        float: 'left'
    },
    socialIcon: {
        marginTop: '5px',
        marginRight: '8px',
        width: '19px'
    }
};

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form>
            <h1> Login </h1>
            <ThemeProvider
                theme={theme}
            >
                <Button onClick={() => Auth.federatedSignIn({ provider: 'Google' })} variant="contained" color="primary">
                    <div style={styles.left}>
                        <img style={styles.socialIcon} alt="Google" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                    </div>
                    Sign In with Google
                </Button>
                <Button onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })} variant="contained" color="secondary">
                    <div style={styles.left}>
                        <img style={styles.socialIcon} alt="Google" src="/fb.png" />
                    </div>
                    Sign In with Facebook
                </Button>
            </ThemeProvider>
            <br />
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
        </form >
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
